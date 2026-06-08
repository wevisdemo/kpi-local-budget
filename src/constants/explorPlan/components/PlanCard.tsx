import Button from "@/src/components/Button";
import type { ReactNode } from "react";

export function PlanCard({
  title,
  badge,
  children,
  exploreLabel,
  onExplore,
}: {
  title: string | ReactNode;
  badge: string;
  children: ReactNode;
  exploreLabel?: string;
  onExplore?: () => void;
}) {
  return (
    <article className="flex flex-col rounded-[10px] bg-gray-10 p-10 text-black gap-5">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="wv-h6 wv-bold wv-ibmplexlooped">{title}</h3>
        </div>
        <span className="flex flex-col size-[70px] shrink-0 items-center justify-center rounded-full bg-green-30 text-center leading-tight text-white">
          <p className="wv-b6 wv-bold wv-ibmplexlooped">ทำทุก</p>
          <p className="wv-b3 wv-bold wv-ibmplexlooped">{badge}</p>
        </span>
      </div>

      <hr className="border-gray-30" />

      <div className="flex flex-1 flex-col gap-4">{children}</div>
      <div className="flex justify-end">
        <Button
          variant="primary"
          theme="dark"
          onClick={onExplore}
          leftIcon={null}
        >
          {exploreLabel ?? "สำรวจ"}
        </Button>
      </div>
    </article>
  );
}
