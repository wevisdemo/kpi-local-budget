"use client";

import { useMemo, useState } from "react";

import FavButtonGoal from "@/src/components/FavButtonGoal";
import Tag from "@/src/components/Tag";
import type { Goal } from "@/src/services/type";
import { IdeaCategory } from "../../createIdea/types";
import { useRouter } from "next/navigation";

interface CardProps {
  goal: Goal[];
  onProjectsClick?: (goal: Goal) => void;
  className?: string;
  category: IdeaCategory;
  onRefetch?: () => void;
}

const PAGE_SIZE = 5;

const Card = ({
  goal,
  onProjectsClick,
  className = "",
  category,
  onRefetch,
}: CardProps) => {
  const [page, setPage] = useState(1);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const filteredGoals = useMemo(
    () => goal.filter((item) => item.category === category.title),
    [goal, category.title],
  );
  const router = useRouter();
  const totalPages = Math.max(1, Math.ceil(filteredGoals.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedGoals = filteredGoals.slice(startIndex, startIndex + PAGE_SIZE);
  const showPagination = filteredGoals.length > PAGE_SIZE;

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const projectCount = filteredGoals.reduce(
    (acc, goal) => acc + (Number(goal.project_count) ?? 0),
    0,
  );

  return (
    <div
      className={`flex h-full flex-col rounded-[10px] border-2  bg-white! maincategory__${category.id}`}
      style={{
        borderColor: "var(--maincategory-color)",
      }}
    >
      <div
        className={`p-5 maincategory__${category.id}`}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${basePath}/img/${category.id}.png)`,
        }}
      >
        <h2 className="wv-b5 wv-ibmplexlooped wv-bold text-white">
          {category.title}
        </h2>
      </div>

      <div className="p-5 flex gap-2.5 justify-between">
        <div className="">
          <h3 className="wv-b5 wv-bold text-black wv-ibmplexlooped">
            {filteredGoals.length} เป้าหมาย
          </h3>
          <p className="wv-b6 wv-ibmplexlooped text-gray-50">
            เรียงตามการสนับสนุนมากไปน้อย
          </p>
        </div>
        <div className="">
          <a
            href={`${basePath}/explore-idea/project?category=${category.title}&goal=`}
            className="wv-b6 wv-bold text-gray-30 wv-ibmplexlooped underline hover:text-black"
          >
            {projectCount} โครงการ
          </a>
        </div>
      </div>

      <div className="flex-1">
        {pagedGoals.map((item, index) => {
          const projectCount = item.project_count ?? 0;
          const goalId =
            item.Id !== undefined && item.Id !== null
              ? String(item.Id)
              : undefined;
          const typeTag = item.creator_id ? "propose" : "exist";

          return (
            <article
              key={goalId ?? `${startIndex}-${index}`}
              className={[
                "wv-ibmplexlooped flex items-start justify-between gap-3 border-b border-gray-20 pt-2.5 px-5 pb-5 last:border-b-0",
                className,
              ].join(" ")}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="wv-b4 text-black">{item.goal ?? "-"}</h3>
                <Tag variant={typeTag} size="small">
                  {typeTag === "exist"
                    ? "สิ่งที่กำลังจะทำอยู่แล้ว"
                    : "ไอเดียใหม่จากเพื่อนบ้าน"}
                </Tag>
              </div>

              <div className="flex shrink-0 flex-col items-end justify-between gap-3 self-stretch">
                <FavButtonGoal
                  id={goalId}
                  goal={item}
                  count={Number(item.vote_count ?? 0)}
                  onRefetch={onRefetch}
                />
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/explore-idea/project?category=${category.title}&goal=${item.goal}`,
                    )
                  }
                  className="wv-b6 wv-ibmplexlooped cursor-pointer text-gray-50 underline hover:text-black"
                >
                  {projectCount} โครงการ
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {showPagination && (
        <div className="wv-ibmplexlooped flex items-center justify-center gap-6 border-t border-gray-20 py-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="cursor-pointer text-black transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="wv-b5 text-black tabular-nums">
            {currentPage}/{totalPages}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="cursor-pointer text-black transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
