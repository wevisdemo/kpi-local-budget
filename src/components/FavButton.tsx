"use client";

import Image from "next/image";
import { useState, type ButtonHTMLAttributes, useEffect } from "react";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import type { Project } from "../services/type";
import {
  addFavProject,
  addFavProjectTransaction,
  formatTransactionTimestamp,
  getTransactionsByUserId,
  removeFavProject,
  removeFavProjectTransaction,
} from "../services/submitTransaction";
import Button from "./Button";
import { useCookieConsentStore } from "../stores/useCookieConsentStore";
import { Turnstile } from "@marsidev/react-turnstile";
import { Transaction } from "../services/type";

interface FavButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  project?: Project;
  id?: string;
  count?: number;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
}

export default function FavButton({
  id,
  count = 0,
  selected,
  project,
  defaultSelected = false,
  onChange,
  className = "",
  ...rest
}: FavButtonProps) {
  const storeSelected = useFavoritesStore((state) =>
    id ? !!state.favorites[id] : false,
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const timestamp = formatTransactionTimestamp();
  const consentId = useCookieConsentStore((state) => state.consentId);
  const [token, setToken] = useState<string | null>(null);
  const userId = consentId ?? "";
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const projectTransaction = transactions.find(
    (transaction) => transaction.project === project?.project,
  );

  useEffect(() => {
    if (userId) {
      getTransactionsByUserId(userId).then(setTransactions);
    }
  }, []);

  const handleClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    applyChange();
  };

  const handleCancel = () => setConfirmOpen(false);

  useEffect(() => {
    if (!confirmOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [confirmOpen]);

  const isControlled = selected !== undefined;
  const useStore = !isControlled && !!id;

  const isSelected = isControlled
    ? selected
    : useStore
      ? storeSelected
      : internalSelected;

  const displayCount = !isControlled && isSelected ? count + 1 : count;

  const applyChange = async () => {
    if (project?.project_id) {
      if (isSelected) {
        await removeFavProject(project.project_id, project.vote_count ?? 0);
        await removeFavProjectTransaction(
          token ?? "",
          projectTransaction?.Id ?? "",
        );
      } else {
        await addFavProject(project.project_id, displayCount ?? 0);
        await addFavProjectTransaction(
          token ?? "",
          "",
          project.project,
          userId ?? "",
          timestamp,
        );
      }
    }
    const next = !isSelected;
    if (useStore && id) {
      toggleFavorite(id);
    } else if (!isControlled) {
      setInternalSelected(next);
    }
    onChange?.(next);
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const iconSrc = isSelected
    ? `${basePath}/icon/heart-pink-check.svg`
    : `${basePath}/icon/heart-pink.svg`;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isSelected}
        className={[
          "group inline-flex flex-col items-center  cursor-pointer",
          className,
        ].join(" ")}
        {...rest}
      >
        <Image
          src={iconSrc}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="transition-transform group-hover:scale-110"
        />
        <span className="wv-b5 wv-bold leading-none text-pink-30 wv-ibmplexlooped">
          {displayCount}
        </span>
      </button>
      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fav-goal-confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          onClick={handleCancel}
        >
          <div
            className="relative w-full max-w-[480px] rounded-[20px] bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCancel}
              aria-label="ปิด"
              className="absolute right-5 top-5 cursor-pointer text-black hover:opacity-60"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2
              id="fav-goal-confirm-title"
              className="wv-h6 wv-bold wv-ibmplexlooped text-black"
            >
              ยืนยัน
            </h2>

            <div className="wv-b3 wv-ibmplexlooped mt-4 text-black">
              <span>
                {isSelected ? (
                  <p>
                    คุณต้องการ<b className="font-normal underline">ยกเลิก</b>
                    สนับสนุนโครงการ
                  </p>
                ) : (
                  "คุณต้องการสนับสนุนโครงการ"
                )}{" "}
                <p className="wv-bold">‘{project?.project ?? "-"}’</p>
              </span>
            </div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
              onSuccess={(token) => setToken(token)}
            />
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="secondary"
                theme="dark"
                leftIcon={null}
                rightIcon={null}
                onClick={handleCancel}
              >
                ไม่ใช่
              </Button>
              <Button
                variant="primary"
                theme="dark"
                leftIcon={null}
                rightIcon={null}
                onClick={handleConfirm}
                disabled={!token}
              >
                ใช่
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
