"use client";

import { useMemo, useState } from "react";
import type { GoalSheet } from "@/src/services/type";
import { IdeaCategory } from "../../createIdea/types";

interface CardProps {
  goals: GoalSheet[];
  onProjectsClick?: (goal: GoalSheet) => void;
  className?: string;
  category: IdeaCategory;
  onRefetch?: () => void;
  percentage: number;
}

const PAGE_SIZE = 5;

const CardPercent = ({
  goals,
  onProjectsClick,
  className = "",
  category,
  onRefetch,
  percentage,
}: CardProps) => {
  const [page, setPage] = useState(1);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const { filteredGoals, totalBudget } = useMemo(() => {
    const rows = goals.filter((item) => item.category === category.title);
    const totalBudget = rows.reduce(
      (acc, goal) => acc + (Number(goal.all_budget) ?? 0),
      0,
    );
    const sorted = [...rows].sort((a, b) => {
      const pctA =
        totalBudget > 0 ? ((a.all_budget ?? 0) / totalBudget) * 100 : 0;
      const pctB =
        totalBudget > 0 ? ((b.all_budget ?? 0) / totalBudget) * 100 : 0;
      return pctB - pctA;
    });
    return { filteredGoals: sorted, totalBudget };
  }, [goals, category.title]);
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
        className={`p-5 maincategory__${category.id} flex items-center justify-between gap-1`}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${basePath}/img/${category.id}.png)`,
        }}
      >
        <h2 className="wv-b5 wv-ibmplexlooped wv-bold text-white">
          {category.title}
        </h2>

        <div className="flex flex-row items-center justify-end gap-3">
          <div
            className="w-px shrink-0 self-stretch bg-white"
            aria-hidden="true"
          />
          <div className="flex flex-col items-end text-right">
            <span className="wv-bold wv-b3 wv-ibmplexlooped text-white">
              {percentage}%
            </span>
            <p className="wv-b6 wv-ibmplexlooped text-white text-nowrap">
              ของงบรวม
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 flex gap-2.5 justify-between">
        <div className="">
          <h3 className="wv-b5 wv-bold text-black wv-ibmplexlooped">
            {filteredGoals.length} เป้าหมาย
          </h3>
          <p className="wv-b6 wv-ibmplexlooped text-gray-50">
            เรียงตามงบมากไปน้อย
          </p>
        </div>
        <div className="">
          <a
            href={`${basePath}/explore-plan/project?category=${category.title}&goal=`}
            className="wv-b6 wv-bold text-gray-30 wv-ibmplexlooped underline hover:text-black"
          >
            {projectCount} โครงการ
          </a>
        </div>
      </div>

      <div className="flex-1">
        {pagedGoals.map((item, index) => {
          const projectCount = item.project_count ?? 0;
          const percentage =
            totalBudget > 0 ? ((item.all_budget ?? 0) / totalBudget) * 100 : 0;
          const goalId =
            item.Id !== undefined && item.Id !== null
              ? String(item.Id)
              : undefined;

          return (
            <article
              key={goalId ?? `${startIndex}-${index}`}
              className={[
                "wv-ibmplexlooped flex flex-col gap-2.5 items-start justify-between border-b border-gray-20 pt-2.5 px-5 pb-5 last:border-b-0",
                className,
              ].join(" ")}
            >
              <div className="flex min-w-0 justify-between items-center w-full">
                <h3 className="wv-b4 text-black text-balance">
                  {item.goal ?? "-"}
                </h3>
                <div className="flex flex-col items-end flex-1">
                  <p
                    className="wv-b2 wv-ibmplexlooped wv-bold"
                    style={{ color: "var(--maincategory-color)" }}
                  >
                    {percentage.toFixed(2)}%
                  </p>
                  <a
                    href={`${basePath}/explore-plan/project?category=${category.title}&goal=${item.goal}`}
                    className="wv-b6 wv-ibmplexlooped text-gray-40 underline"
                  >
                    {projectCount} โครงการ
                  </a>
                </div>
              </div>
              <div
                className="h-[5px] w-full bg-(--maincategory-color)/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(
                  Math.min(100, Math.max(0, percentage)),
                )}
                aria-label={`${percentage.toFixed(2)}% ของงบเป้าหมาย`}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, percentage))}%`,
                    backgroundColor: "var(--maincategory-color)",
                  }}
                />
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

export default CardPercent;
