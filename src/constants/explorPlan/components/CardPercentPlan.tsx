"use client";

import { useMemo, useState } from "react";
import type { Plan } from "@/src/services/type";
import { PlanStrategyCategory } from "./ActionPlanTab";
import { usePlanColorStore } from "@/src/stores/usePlanColorStore";
import { basePath } from "@/src/lib/basePath";

interface CardProps {
  planSheets: Plan[];
  className?: string;
  category: PlanStrategyCategory;
  percentage: number;
  color: string;
}

const PAGE_SIZE = 5;

function substrategyLines(substrategy?: string): string[] {
  return (
    substrategy
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? []
  );
}

type SubStrategySummary = {
  substrategy: string;
  budget: number;
  projectCount: number;
};

const CardPercentPlan = ({
  planSheets,
  className = "",
  category,
  percentage,
  color,
}: CardProps) => {
  const [page, setPage] = useState(1);
  const setCategoryColor = usePlanColorStore((state) => state.setColor);
  const rememberCategoryColor = () => {
    setCategoryColor(category.title, color);
  };
  const filteredGoals = useMemo((): SubStrategySummary[] => {
    const bySubStrategy = new Map<
      string,
      { budget: number; projectCount: number }
    >();

    for (const plan of planSheets) {
      if (plan.strategy !== category.title) continue;
      const names = substrategyLines(plan.substrategy);
      if (names.length === 0) continue;

      for (const name of names) {
        const entry = bySubStrategy.get(name) ?? {
          budget: 0,
          projectCount: 0,
        };
        entry.budget += plan.budget ?? 0;
        entry.projectCount += 1;
        bySubStrategy.set(name, entry);
      }
    }

    return [...bySubStrategy.entries()]
      .map(([substrategy, { budget, projectCount }]) => ({
        substrategy,
        budget,
        projectCount,
      }))
      .sort((a, b) => b.budget - a.budget);
  }, [planSheets, category.title]);
  const totalPages = Math.max(1, Math.ceil(filteredGoals.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedGoals = filteredGoals.slice(startIndex, startIndex + PAGE_SIZE);
  const showPagination = filteredGoals.length > PAGE_SIZE;

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const totalSubStrategy = filteredGoals.length;

  const projectCount = useMemo(
    () => planSheets.filter((plan) => plan.strategy === category.title).length,
    [planSheets, category.title],
  );

  const totalCategoryBudget = useMemo(
    () => filteredGoals.reduce((acc, item) => acc + item.budget, 0),
    [filteredGoals],
  );

  return (
    <div
      className={`flex h-full flex-col rounded-[10px] border-2  bg-white!`}
      style={{
        borderColor: color,
      }}
    >
      <div
        className={`p-5 flex items-center justify-between gap-1 w-full`}
        style={{
          backgroundColor: color,
        }}
      >
        <h2 className="wv-b5 wv-ibmplexlooped wv-bold text-white text-balance  w-[70%]">
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
            {totalSubStrategy} กลยุทธ์
          </h3>
          <p className="wv-b6 wv-ibmplexlooped text-gray-50">
            เรียงตามงบมากไปน้อย
          </p>
        </div>
        <div className="">
          <a
            href={`${basePath}/explore-plan/plan?category=${category.title}&goal=`}
            onClick={rememberCategoryColor}
            className="wv-b6 wv-bold text-gray-30 wv-ibmplexlooped underline hover:text-black"
          >
            {projectCount} โครงการ
          </a>
        </div>
      </div>

      <div className="flex-1">
        {pagedGoals.map((item, index) => {
          const rowProjectCount = item.projectCount;
          const rowPercentage =
            totalCategoryBudget > 0
              ? (item.budget / totalCategoryBudget) * percentage
              : 0;

          return (
            <article
              key={item.substrategy ?? `${startIndex}-${index}`}
              className={[
                "wv-ibmplexlooped flex flex-col gap-2.5 items-start justify-between border-b border-gray-20 pt-2.5 px-5 pb-5 last:border-b-0",
                className,
              ].join(" ")}
            >
              <div className="flex min-w-0 justify-between items-center w-full">
                <h3 className="wv-b4 text-black text-balance">
                  {item.substrategy}
                </h3>
                <div className="flex flex-col items-end flex-1">
                  <p
                    className="wv-b2 wv-ibmplexlooped wv-bold"
                    style={{ color: color }}
                  >
                    {rowPercentage.toFixed(2)}%
                  </p>
                  <a
                    href={`${basePath}/explore-plan/plan?category=${category.title}&goal=${encodeURIComponent(item.substrategy)}`}
                    onClick={rememberCategoryColor}
                    className="wv-b6 wv-ibmplexlooped text-gray-40 underline"
                  >
                    {rowProjectCount} โครงการ
                  </a>
                </div>
              </div>
              <div
                className={`h-[5px] w-full`}
                role="progressbar"
                style={{
                  backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(
                  Math.min(100, Math.max(0, rowPercentage)),
                )}
                aria-label={`${rowPercentage.toFixed(2)}% ของงบเป้าหมาย`}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, rowPercentage))}%`,
                    backgroundColor: color,
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

export default CardPercentPlan;
