import { explorePlanTabs, type TabId } from "./types";
import { useRouter } from "next/navigation";

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  const router = useRouter();
  return (
    <nav role="tablist" aria-label="ประเภทแผน" className="flex flex-wrap">
      {explorePlanTabs.map((t) => {
        const selected = active === t.id;
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-controls={`panel-${t.id}`}
            aria-selected={selected}
            className={`flex-1 relative py-2.5 wv-b5 wv-ibmplexlooped text-black hover:bg-gray-10  ${
              selected ? "wv-bold" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => router.push(t.href)}
          >
            {t.label}
            {selected && (
              <span
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-30"
              />
            )}
            {!selected && (
              <span
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-20"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
