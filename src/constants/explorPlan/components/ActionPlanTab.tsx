"use client";

import React, { useEffect, useMemo, useState } from "react";

import type { Plan } from "@/src/services/type";
import Image from "next/image";
import { currentSite } from "@/src/config/sites";
import { basePath } from "@/src/lib/basePath";
import { formatBaht } from "@/src/lib/formatBath";
import { getPlanSheet } from "@/src/lib/getPlan";
import { colorPlan } from "./types";
import CardPercentPlan from "./CardPercentPlan";

export type PlanStrategyCategory = {
  id: string;
  title: string;
  color: string;
};

function colorPlanByRank(rankIndex: number): string {
  const colorId = Math.min(rankIndex + 1, colorPlan.length);
  return (
    colorPlan.find((c) => c.id === colorId)?.color ??
    colorPlan[rankIndex % colorPlan.length].color
  );
}

const ActionPlanTab = () => {
  const [planSheets, setPlanSheets] = useState<Plan[]>([]);
  const [methodologyModalOpen, setMethodologyModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<PlanStrategyCategory | null>(null);
  useEffect(() => {
    let active = true;

    getPlanSheet()
      .then((data) => {
        if (active) setPlanSheets(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load plans", error);
        if (active) setPlanSheets([]);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!methodologyModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMethodologyModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [methodologyModalOpen]);

  const totalBudget = planSheets.reduce(
    (acc, plan) => acc + (plan.budget ?? 0),
    0,
  );

  const uniqueStrategies = new Set<string>();
  for (const plan of planSheets) {
    const trimmed = plan.strategy?.trim();
    if (trimmed) uniqueStrategies.add(trimmed);
  }
  const totalStrategy = uniqueStrategies.size;

  const uniqueSubStrategies = new Set<string>();
  for (const plan of planSheets) {
    const trimmed = plan.substrategy?.trim();
    if (trimmed) uniqueSubStrategies.add(trimmed);
  }
  const totalSubStrategy = uniqueSubStrategies.size;

  const uniqueProjects = new Set<string>();
  for (const plan of planSheets) {
    const trimmed = plan.project?.trim();
    if (trimmed) uniqueProjects.add(trimmed);
  }
  const totalProjects = uniqueProjects.size;

  const budgetPercentByCategoryId = useMemo(() => {
    const byStrategy = new Map<string, number>();
    let other = 0;
    for (const plan of planSheets) {
      const amount = plan.budget ?? 0;
      const strategy = plan.strategy?.trim();
      if (strategy) {
        byStrategy.set(strategy, (byStrategy.get(strategy) ?? 0) + amount);
      } else {
        other += amount;
      }
    }

    const denom = totalBudget > 0 ? totalBudget : 0;
    const pct = (amount: number) =>
      denom > 0 ? Math.round((amount / denom) * 1000) / 10 : 0;

    const strategyEntries = [...byStrategy.entries()]
      .map(([title, amount], order) => ({
        id: title,
        title,
        amount,
        order,
      }))
      .sort((a, b) => {
        if (b.amount !== a.amount) return b.amount - a.amount;
        return a.order - b.order;
      })
      .map((entry, rankIndex) => ({
        ...entry,
        color: colorPlanByRank(rankIndex),
      }));

    const known: Record<string, number> = {};
    for (const entry of strategyEntries) {
      known[entry.id] = pct(entry.amount);
    }
    const otherPct = pct(other);

    const barSegments: Array<{
      key: string;
      categoryId: string | null;
      title: string;
      pct: number;
      amount: number;
      order: number;
      color: string;
    }> = [];

    for (const entry of strategyEntries) {
      const p = known[entry.id] ?? 0;
      if (p > 0) {
        barSegments.push({
          key: entry.id,
          categoryId: entry.id,
          title: entry.title,
          pct: p,
          amount: entry.amount,
          order: entry.order,
          color: entry.color,
        });
      }
    }

    if (otherPct > 0) {
      barSegments.push({
        key: "__other__",
        categoryId: null,
        title: "ไม่ระบุยุทธศาสตร์",
        pct: otherPct,
        amount: other,
        order: strategyEntries.length,
        color: "#d1d5db",
      });
    }

    barSegments.sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount;
      return a.order - b.order;
    });

    const sortedCategories: PlanStrategyCategory[] = [...strategyEntries]
      .sort((a, b) => {
        if (b.amount !== a.amount) return b.amount - a.amount;
        return a.order - b.order;
      })
      .map(({ id, title, color }) => ({ id, title, color }));

    return { known, otherPct, barSegments, sortedCategories };
  }, [planSheets, totalBudget]);

  const fillterCategoryGoals = activeCategory
    ? [activeCategory]
    : budgetPercentByCategoryId.sortedCategories;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1500px] mx-auto lg:px-0 flex flex-col gap-2.5">
        <h1 className="wv-h5 wv-ibmplexlooped wv-bold text-black ">
          สำรวจแผนดำเนินงาน
          <br className="md:hidden block" />
          ประจำปีงบประมาณ <br className="md:hidden block" />
          พ.ศ. 2569
        </h1>
        <p className="wv-b4 wv-ibmplexlooped text-gray-50 ">
          ใช้ข้อมูลจาก
          <a
            href={currentSite.planLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            แผนดำเนินงานฉบับแก้ไขล่าสุด
            <br className="md:hidden block" />
          </a>{" "}
          (เผยแพร่เมื่อ {currentSite.acion_date})
        </p>
        <div className=" grid grid-cols-1 gap-2.5 md:grid-cols-2">
          <div className="rounded-[10px] bg-gray-20 p-10">
            <div className="flex justify-between items-start">
              <div className="wv-ibmplexlooped text-black">
                <p className="wv-b4 ">งบประมาณรวม</p>
                <p className="wv-h6 wv-bold">
                  {formatBaht(totalBudget)} ล้านบาท
                </p>
              </div>
              <Image
                src={`${basePath}/icon/price.svg`}
                alt="explore idea"
                width={32}
                height={32}
              />
            </div>
          </div>
          <div className="rounded-[10px] bg-gray-20 p-10 flex flex-col gap-1.5 wv-ibmplexlooped">
            <p className="wv-b4 text-black">แบ่งออกเป็น</p>
            <div className="flex justify-between items-center">
              <div className="wv-bold">
                <p className="wv-h6 ">{totalStrategy}</p>
                <p className="wv-b3">ยุทธศาสตร์</p>
              </div>
              <div className="wv-bold">
                <p className="wv-h6">{totalSubStrategy}</p>
                <p className="wv-b3">กลยุทธ์</p>
              </div>
              <div className="wv-bold">
                <p className="wv-h6">{totalProjects}</p>
                <p className="wv-b3">โครงการ</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 mt-5 ">
          <p className="wv-b3 wv-ibmplexlooped wv-bold text-black">
            งบประมาณรายยุทธศาสตร์
          </p>
          <p className="wv-b6 wv-ibmplexlooped text-gray-40">
            หมายเหตุ: คำนวณสัดส่วนจากงบประมาณรวม
          </p>
          <div className="flex flex-row items-stretch gap-2.5 md:flex-col">
            <div className="w-[50px] min-h-[120px] shrink-0 self-stretch overflow-visible md:h-[50px] md:min-h-0 md:w-full md:self-auto">
              <div className="flex h-full w-full flex-col md:flex-row">
                {budgetPercentByCategoryId.barSegments.map((seg, i) => {
                  const rightHalf =
                    i >= budgetPercentByCategoryId.barSegments.length / 2;
                  const category = seg.categoryId
                    ? budgetPercentByCategoryId.sortedCategories.find(
                        (c) => c.id === seg.categoryId,
                      )
                    : null;
                  const isActive = Boolean(
                    category && activeCategory?.id === category.id,
                  );
                  const isDimmed = activeCategory !== null && !isActive;
                  return (
                    <button
                      key={seg.key}
                      type="button"
                      disabled={!category}
                      onClick={() => {
                        if (!category) return;
                        setActiveCategory(isActive ? null : category);
                      }}
                      className={`group/seg relative h-(--seg-pct) min-h-px w-full shrink-0 border-0 p-0 md:h-full md:w-(--seg-pct) md:min-w-px hover:border-2 hover:border-black ${category ? "cursor-pointer" : "cursor-default"} transition-opacity ${isDimmed ? "opacity-20" : ""}`}
                      style={
                        {
                          "--seg-pct": `${seg.pct}%`,
                          backgroundColor: seg.color,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className={`pointer-events-none absolute left-full top-0 ml-2 z-50 hidden bg-black px-4 py-3 text-white shadow-lg group-hover/seg:block md:top-full md:ml-0 md:mt-2 md:translate-x-0 ${rightHalf ? "md:left-auto md:right-0" : "md:left-0 md:right-auto"} w-[275px] max-w-[90vw]`}
                      >
                        <p className="wv-b2 wv-ibmplexlooped wv-bold text-left">
                          {seg.title}
                        </p>
                        <p className="wv-b5 wv-ibmplexlooped text-left">
                          <span className="wv-bold">{seg.pct}%</span>{" "}
                          <span className="text-gray-30">
                            ({formatBaht(seg.amount)} ล้านบาท)
                          </span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {budgetPercentByCategoryId.sortedCategories.map((category) => {
                const sharePct =
                  budgetPercentByCategoryId.known[category.id] ?? 0;
                const isActive = activeCategory?.id === category.id;
                const isDimmed =
                  activeCategory !== null && activeCategory.id !== category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(isActive ? null : category);
                    }}
                    style={{
                      borderColor: category.color,
                    }}
                    className={`text-left wv-b5 wv-ibmplexlooped cursor-pointer rounded-[10px] border bg-transparent! px-2.5 py-1.5 transition-colors hover:bg-gray-10! text-gray-50 ${isActive ? "bg-white!" : ""} ${isDimmed ? "opacity-20" : ""}`}
                  >
                    <span
                      className="wv-bold"
                      style={{
                        color: category.color,
                        marginRight: "4px",
                      }}
                    >
                      {sharePct}%
                    </span>
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 mt-5">
          {fillterCategoryGoals.map((category) => (
            <CardPercentPlan
              key={category.id}
              planSheets={planSheets}
              category={category}
              percentage={budgetPercentByCategoryId.known[category.id] ?? 0}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionPlanTab;
