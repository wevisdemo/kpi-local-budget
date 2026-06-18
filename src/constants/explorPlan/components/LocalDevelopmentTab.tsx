"use client";

import React, { useEffect, useMemo, useState } from "react";

import type { GoalSheet, Project } from "@/src/services/type";
import Image from "next/image";
import { IdeaCategory } from "../../createIdea/types";
import { ideaCategories } from "../../createIdea/data";
import { getProject } from "@/src/lib/getProject";
import { currentSite } from "@/src/config/sites";
import { basePath } from "@/src/lib/basePath";
import { formatBaht } from "@/src/lib/formatBath";
import CardPercent from "./CardPercent";

function projectFiveYearBudget(project: Project): number {
  return (
    (project.budget_66 ?? 0) +
    (project.budget_67 ?? 0) +
    (project.budget_68 ?? 0) +
    (project.budget_69 ?? 0) +
    (project.budget_70 ?? 0)
  );
}

function categoryIdFromCategoryAi(
  categoryAi: string | undefined,
): string | null {
  const raw = categoryAi?.trim();
  if (!raw) return null;
  const byId = ideaCategories.find((c) => c.id === raw);
  if (byId) return byId.id;
  const byTitle = ideaCategories.find((c) => c.title === raw);
  return byTitle?.id ?? null;
}

function categoryTitleFromCategoryAi(
  categoryAi: string | undefined,
): string | null {
  const id = categoryIdFromCategoryAi(categoryAi);
  if (!id) return null;
  return ideaCategories.find((c) => c.id === id)?.title ?? null;
}

function goalSheetsFromProjects(projectsList: Project[]): GoalSheet[] {
  const merged = new Map<string, GoalSheet>();
  for (const project of projectsList) {
    const categoryTitle = categoryTitleFromCategoryAi(project.category_ai);
    if (!categoryTitle) continue;
    const rawLines =
      project.goal_ai?.split("\n").map((line) => line.trim()) ?? [];
    const lines = [...new Set(rawLines.filter(Boolean))];
    if (lines.length === 0) continue;
    const budget = projectFiveYearBudget(project);
    for (const line of lines) {
      const key = `${categoryTitle}\u0000${line}`;
      const prev = merged.get(key);
      if (prev) {
        merged.set(key, {
          ...prev,
          all_budget: (prev.all_budget ?? 0) + budget,
          project_count: (prev.project_count ?? 0) + 1,
        });
      } else {
        merged.set(key, {
          Id: key,
          goal: line,
          category: categoryTitle,
          all_budget: budget,
          project_count: 1,
        });
      }
    }
  }
  return Array.from(merged.values());
}

const LocalDevelopmentTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [methodologyModalOpen, setMethodologyModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<IdeaCategory | null>(
    null,
  );
  const fillterCategoryGoals = activeCategory
    ? [activeCategory]
    : ideaCategories;
  const getProjectsFunction = async () => {
    const data = await getProject();
    setProjects(data);
  };
  useEffect(() => {
    let active = true;

    getProject()
      .then((data) => {
        if (active) setProjects(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        if (active) setProjects([]);
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

  const totalBudget = projects.reduce(
    (acc, project) => acc + projectFiveYearBudget(project),
    0,
  );

  const budgetPercentByCategoryId = useMemo(() => {
    const byId: Record<string, number> = Object.fromEntries(
      ideaCategories.map((c) => [c.id, 0]),
    );
    let other = 0;
    for (const project of projects) {
      const b = projectFiveYearBudget(project);
      const id = categoryIdFromCategoryAi(project.category_ai);
      if (id) byId[id] += b;
      else other += b;
    }
    const denom = totalBudget > 0 ? totalBudget : 0;
    const pct = (amount: number) =>
      denom > 0 ? Math.round((amount / denom) * 1000) / 10 : 0;
    const known: Record<string, number> = {};
    for (const c of ideaCategories) {
      known[c.id] = pct(byId[c.id] ?? 0);
    }
    const otherPct = pct(other);

    const rawAmount = (categoryId: string) => byId[categoryId] ?? 0;
    const barSegments: Array<{
      key: string;
      categoryId: string | null;
      title: string;
      pct: number;
      amount: number;
      order: number;
    }> = [];
    ideaCategories.forEach((c, index) => {
      const amount = rawAmount(c.id);
      const p = known[c.id] ?? 0;
      if (p > 0) {
        barSegments.push({
          key: c.id,
          categoryId: c.id,
          title: c.title,
          pct: p,
          amount,
          order: index,
        });
      }
    });
    if (otherPct > 0) {
      barSegments.push({
        key: "__other__",
        categoryId: null,
        title: "ไม่ระบุประเด็น",
        pct: otherPct,
        amount: other,
        order: ideaCategories.length,
      });
    }
    barSegments.sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount;
      return a.order - b.order;
    });

    const sortedCategories = ideaCategories
      .map((c, order) => ({
        category: c,
        order,
        amount: byId[c.id] ?? 0,
      }))
      .sort((a, b) => {
        if (b.amount !== a.amount) return b.amount - a.amount;
        return a.order - b.order;
      })
      .map((x) => x.category);

    const visibleCategories = sortedCategories.filter(
      (c) => (known[c.id] ?? 0) > 0,
    );

    return {
      known,
      otherPct,
      barSegments,
      sortedCategories,
      visibleCategories,
    };
  }, [projects, totalBudget]);

  const goalSheets = useMemo(
    () => goalSheetsFromProjects(projects),
    [projects],
  );

  const uniqueGoalLines = new Set<string>();
  for (const project of projects) {
    const lines = project.goal_ai?.split("\n") ?? [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed) uniqueGoalLines.add(trimmed);
    }
  }

  const totalProjects = projects.length;
  const totalGoals = uniqueGoalLines.size;
  const totalObjectives = budgetPercentByCategoryId.visibleCategories.length;

  // console.log(projects);

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1500px] mx-auto lg:px-0 flex flex-col gap-2.5">
        <h1 className="wv-h5 wv-ibmplexlooped wv-bold text-black ">
          สำรวจแผนพัฒนาท้องถิ่น 5 ปี (พ.ศ. 2566-2570)
        </h1>
        <p className="wv-b4 wv-ibmplexlooped text-gray-50 ">
          ใช้ข้อมูลจาก
          <a
            href={currentSite.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            เอกสารแผนพัฒนาท้องถิ่นฉบับแรก
          </a>{" "}
          (เผยแพร่เมื่อ {currentSite.date})
        </p>
        <div className=" grid grid-cols-1 gap-2.5 md:grid-cols-2">
          <div className="rounded-[10px] bg-gray-20 p-10">
            <div className="flex justify-between items-start">
              <div className="wv-ibmplexlooped text-black">
                <p className="wv-b4 ">งบประมาณรวม 5 ปี</p>
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
            <p className="wv-b6 wv-ibmplexlooped text-gray-40">
              หมายเหตุ: งบประมาณที่ใช้จริงอาจมีการเปลี่ยนแปลงตามสถานการณ์รายปี
            </p>
          </div>
          <div className="rounded-[10px] bg-gray-20 p-10 flex flex-col gap-1.5 wv-ibmplexlooped">
            <p className="wv-b4 text-black">ภาพรวม</p>
            <div className="flex justify-between items-center">
              <div className="wv-bold">
                <p className="wv-h6 ">{totalObjectives}</p>
                <p className="wv-b3">ประเด็น</p>
              </div>
              <div className="wv-bold">
                <p className="wv-h6">{totalGoals}</p>
                <p className="wv-b3">เป้าหมาย</p>
              </div>
              <div className="wv-bold">
                <p className="wv-h6">{totalProjects}</p>
                <p className="wv-b3">โครงการ</p>
              </div>
            </div>
            <p className="wv-b6 wv-ibmplexlooped text-gray-40">
              หมายเหตุ: ประเด็นและเป้าหมายเป็นการจัดกลุ่มใหม่โดยผู้จัดทำ
              เพื่อให้เข้าใจง่าย ไม่ได้อิงจากเอกสารต้นฉบับ{" "}
              <button
                type="button"
                onClick={() => setMethodologyModalOpen(true)}
                className="cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit underline hover:text-black"
              >
                ดูวิธีการจัด
              </button>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 mt-5 ">
          <p className="wv-b3 wv-ibmplexlooped wv-bold text-black">
            สำรวจงบประมาณรายประเด็น
          </p>
          <p className="wv-b6 wv-ibmplexlooped text-gray-40">
            หมายเหตุ: คำนวณสัดส่วนจากงบประมาณรวม 5 ปี
          </p>
          <div className="flex flex-row items-stretch gap-2.5 md:flex-col">
            <div className="w-[50px] min-h-[120px] shrink-0 self-stretch overflow-visible md:h-[50px] md:min-h-0 md:w-full md:self-auto">
              <div className="flex h-full w-full flex-col md:flex-row">
                {budgetPercentByCategoryId.barSegments.map((seg, i) => {
                  const rightHalf =
                    i >= budgetPercentByCategoryId.barSegments.length / 2;
                  const tipPos = rightHalf
                    ? "md:left-auto md:right-0"
                    : "md:left-0 md:right-auto";
                  const category = seg.categoryId
                    ? ideaCategories.find((c) => c.id === seg.categoryId)
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
                      className={`group/seg relative h-(--seg-pct) min-h-px w-full shrink-0 border-0 p-0 md:h-full md:w-(--seg-pct) md:min-w-px hover:border-2 hover:border-black ${seg.categoryId ? `maincategory__${seg.categoryId}` : "bg-gray-30"} ${category ? "cursor-pointer" : "cursor-default"} transition-opacity ${isDimmed ? "opacity-20" : ""}`}
                      style={
                        { "--seg-pct": `${seg.pct}%` } as React.CSSProperties
                      }
                    >
                      <div
                        className={`pointer-events-none absolute left-full top-0 ml-2 z-50 hidden bg-black px-4 py-3 text-white shadow-lg group-hover/seg:block md:top-full md:ml-0 md:mt-2 md:translate-x-0 ${tipPos} w-[275px] max-w-[90vw]`}
                      >
                        <p className="wv-b2 wv-ibmplexlooped wv-bold text-left">
                          {seg.title}
                        </p>
                        <div className="wv-b5 wv-ibmplexlooped flex items-center gap-1">
                          <p>{seg.pct}%</p>

                          <p className="text-gray-30">
                            ({formatBaht(seg.amount)} ล้านบาท)
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {budgetPercentByCategoryId.visibleCategories.map((category) => {
                const sharePct =
                  budgetPercentByCategoryId.known[category.id] ?? 0;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(
                        activeCategory?.id === category.id ? null : category,
                      );
                    }}
                    style={{
                      borderColor: "var(--maincategory-color)",
                    }}
                    className={`text-left wv-b5 wv-ibmplexlooped maincategory__${category.id} cursor-pointer rounded-[10px] border bg-transparent! px-2.5 py-1.5 transition-colors hover:bg-gray-10! text-gray-50 ${activeCategory?.id === category.id ? "bg-white!" : ""} ${activeCategory && activeCategory?.id !== category.id ? "opacity-20" : ""}`}
                  >
                    <span
                      className="wv-bold"
                      style={{
                        color: "var(--maincategory-color)",
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
          {(activeCategory
            ? fillterCategoryGoals
            : budgetPercentByCategoryId.visibleCategories
          ).map((category) => (
            <CardPercent
              key={category.id}
              goals={goalSheets}
              category={category}
              onRefetch={getProjectsFunction}
              percentage={budgetPercentByCategoryId.known[category.id] ?? 0}
            />
          ))}
        </div>
      </div>

      {methodologyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="local-dev-methodology-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          onClick={() => setMethodologyModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[755px] rounded-[10px] bg-white p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMethodologyModalOpen(false)}
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
              id="local-dev-methodology-title"
              className="wv-h6 wv-bold wv-ibmplexlooped text-black"
            >
              วิธีจัดกลุ่มข้อมูล
            </h2>

            <div className="wv-b3 wv-ibmplexlooped mt-4 space-y-4 text-black">
              <div>
                <p>
                  เอกสารแผนพัฒนาท้องถิ่น 5 ปี (พ.ศ. 2566-2570) ฉบับแรก
                  จัดโครงการตามยุทธศาสตร์และแผนงาน
                  ซึ่งมีภาษาที่ซับซ้อนและเข้าใจยากสำหรับประชาชนทั่วไป
                </p>
                <span>
                  ผู้จัดทำจึงได้นำข้อมูลโครงการทั้งหมดมาจัดกลุ่มใหม่เป็น 2 ระดับ
                  ได้แก่
                  <ul className="list-disc pl-[2ch]">
                    <li>
                      <b>ประเด็น</b>: ระดับภาพรวม มีจำนวนไม่มาก
                      และสะท้อนทิศทางหลักของการพัฒนา
                    </li>
                    <li>
                      <b>เป้าหมาย</b> (กลุ่มย่อย): ระดับรายละเอียด
                      มีจำนวนมากกว่า และรวมโครงการที่มีลักษณะใกล้เคียงกัน
                    </li>
                  </ul>
                </span>
              </div>
              <div>
                <b>ขั้นตอนจัดกลุ่ม</b>
                <p>
                  ผู้จัดทำใช้ระบบปัญญาประดิษฐ์ (AI) โมเดล Google AI Studio -
                  Gemini - Claude โดยมีขั้นตอนดังนี้
                </p>
                <b>1. จัดกลุ่มโครงการเป็น ‘เป้าหมาย’</b>
                <p>ใช้ข้อมูลจากเอกสารต้นฉบับ 6 มิติ ได้แก่</p>
                <ul className="list-disc pl-[2ch]">
                  <li>ยุทธศาสตร์</li>
                  <li>แผนงาน</li>
                  <li>โครงการ</li>
                  <li>วัตถุประสงค์</li>
                  <li>เป้าหมาย (ผลผลิตของโครงการ)</li>
                  <li>ผลที่คาดว่าจะได้รับ</li>
                </ul>
                <p>
                  AI จะพิจารณาข้อมูลทั้งหมด โดยให้น้ำหนักกับวัตถุประสงค์
                  เป้าหมาย และผลที่คาดว่าจะได้รับเป็นพิเศษ
                  เพื่อจัดกลุ่มโครงการที่มีความคล้ายคลึงกัน และตั้งชื่อกลุ่ม
                </p>
                <b>2. จัดกลุ่ม “เป้าหมาย” เป็น “ประเด็น”</b>
                <p>
                  ผู้จัดทำกำหนด ประเด็นหลัก 11 ประเด็น เป็นกรอบตั้งต้น
                  จากนั้นให้ AI จับคู่ “เป้าหมาย” ที่ได้จากขั้นตอนก่อนหน้า
                  เข้ากับประเด็นที่เหมาะสม
                </p>
                <b>3. ตรวจสอบและปรับแก้ผลลัพธ์โดยผู้จัดทำ</b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalDevelopmentTab;
