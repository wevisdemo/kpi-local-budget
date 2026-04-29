"use client";

import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  /**
   * Label shown for the "all" option (also used as placeholder when nothing
   * is selected).
   */
  allLabel?: string;
  /**
   * Suffix shown after the option count, e.g. `เป้าหมาย` for `(xx เป้าหมาย)`.
   */
  countSuffix?: string;
  className?: string;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    aria-hidden="true"
    className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path
      d="M1 1L7 7L13 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Dropdown({
  options,
  value,
  onChange,
  allLabel = "ทั้งหมด",
  countSuffix = "เป้าหมาย",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value) ?? null;
  const allLabelWithCount = `${allLabel} (${options.length} ${countSuffix})`;
  const triggerLabel = selected?.label ?? allLabelWithCount;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (next: string | null) => {
    onChange?.(next);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`wv-ibmplexlooped relative w-full text-black ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`border-2 border-white flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-[10px] bg-white/50 px-5 py-2.5 text-left transition-colors hover:bg-white/70 ${open ? "bg-gray-10!" : ""}`}
      >
        <span className="wv-b4 truncate">{triggerLabel}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className={`mt-2.5 overflow-hidden rounded-[10px] bg-white/50 ${open ? "bg-gray-10!" : ""}`}
        >
          <button
            type="button"
            role="option"
            aria-selected={selected === null}
            onClick={() => handleSelect(null)}
            className={`wv-b4 flex w-full cursor-pointer items-center justify-between border-b border-white/60 px-5 py-3 text-left transition-colors hover:bg-white/30 ${open ? "bg-gray-10!" : ""}`}
          >
            <span className="truncate">{allLabelWithCount}</span>
          </button>

          <ul className="flex max-h-[320px] flex-col overflow-y-auto py-1.5">
            {options.map((option) => {
              const isSelected = selected?.value === option.value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    className={`wv-b5 flex w-full cursor-pointer items-start gap-2.5 px-5 py-1.5 text-left transition-colors hover:bg-white/30 border-b border-white ${
                      isSelected ? "wv-bold" : ""
                    } ${open ? "bg-gray-10!" : ""}`}
                  >
                    <span aria-hidden="true" className="leading-normal ml-5">
                      •
                    </span>
                    <span className="flex-1">{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
