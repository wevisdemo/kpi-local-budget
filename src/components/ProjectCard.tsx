"use client";

import { useState } from "react";
import Tag from "./Tag";
import type { Project } from "@/src/services/type";
import FavButton from "./FavButton";

interface ProjectCardProps {
  project: Project;
  likes?: number;
  type?: "exist" | "propose";
}

const BUDGET_YEARS: Array<{ year: number; key: keyof Project }> = [
  { year: 2566, key: "budget_66" },
  { year: 2567, key: "budget_67" },
  { year: 2568, key: "budget_68" },
  { year: 2569, key: "budget_69" },
  { year: 2570, key: "budget_70" },
];

function formatBaht(value: number) {
  return value.toLocaleString("th-TH");
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      aria-hidden="true"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M1 1.5 6 6.5l5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({
  project,
  likes = 0,
  type = "exist",
}: ProjectCardProps) {
  // console.log(project);
  const [expanded, setExpanded] = useState(false);
  const budgets = BUDGET_YEARS.map(({ year, key }) => ({
    year,
    value: (project[key] as number | undefined) ?? 0,
  }));
  const totalBudget = budgets.reduce((sum, item) => sum + item.value, 0);
  const maxBudget = Math.max(...budgets.map((item) => item.value), 0);
  // console.log(project);
  return (
    <article className="rounded-[10px] border-2 border-blue-20 bg-white p-4 wv-ibmplexlooped">
      <header className="flex items-start justify-between gap-3">
        <h3 className="wv-b4 wv-bold text-black">{project.project ?? "-"}</h3>
        <FavButton
          id={project.project_id}
          count={Number(likes)}
          project={project}
        />
      </header>

      <div className="">
        <Tag variant={type} size="small">
          {type === "exist"
            ? "สิ่งที่กำลังจะทำอยู่แล้ว"
            : "ไอเดียใหม่จากเพื่อนบ้าน"}
        </Tag>
      </div>

      {/* {goalText && (
        <div className="mt-3 wv-b5 text-gray-50">
          <p className="wv-bold text-black">เป้าหมาย:</p>
          <p className="mt-0.5 whitespace-pre-line">{goalText}</p>
        </div>
      )} */}

      {totalBudget > 0 && (
        <p className="mt-3 wv-b5 text-blue-30">
          งบประมาณรวม 5 ปี{" "}
          <span className="wv-bold">{formatBaht(totalBudget)}</span> บาท
        </p>
      )}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className={`${expanded ? "border-b pb-2.5" : ""} mt-3 flex w-full items-center gap-1.5 border-gray-20 pt-2.5 wv-b6 text-gray-40 hover:text-gray-50 cursor-pointer`}
      >
        <ChevronIcon open={expanded} />
        <span className="underline">{expanded ? "ย่อ" : "ดูรายละเอียด"}</span>
      </button>

      {expanded && (
        <div className="mt-3 p-3">
          <p className="mb-3 wv-b6 text-gray-40">รายละเอียดตามเอกสารต้นฉบับ</p>

          {(project.strategy || project.plan) && (
            <div className="grid grid-cols-2 gap-3">
              {project.strategy && (
                <Detail label="ยุทธศาสตร์" value={project.strategy} />
              )}
              {project.plan && <Detail label="แนวทาง" value={project.plan} />}
            </div>
          )}

          {project.objective && (
            <Detail
              className="mt-3"
              label="วัตถุประสงค์"
              value={project.objective}
            />
          )}

          {(project.goal_original || project.goal_ai) && (
            <Detail
              className="mt-3"
              label="เป้าหมาย (ผลผลิตของโครงการ)"
              value={project.goal_original ?? project.goal_ai ?? ""}
            />
          )}

          {project.outcome && (
            <Detail
              className="mt-3"
              label="ผลที่คาดว่าจะได้รับ"
              value={project.outcome}
            />
          )}

          {project.kpi && (
            <Detail
              className="mt-3"
              label="ตัวชี้วัดโครงการ (KPI)"
              value={project.kpi}
            />
          )}

          {project.organization && (
            <Detail
              className="mt-3"
              label="หน่วยงานรับผิดชอบ"
              value={project.organization}
            />
          )}

          {totalBudget > 0 && (
            <div className="mt-4">
              <p className="mb-2 wv-b6 wv-bold text-blue-30">
                งบประมาณรายปี (บาท)
              </p>
              <div className="flex h-28 gap-1">
                {budgets.map(({ year, value }) => {
                  const hasValue = value > 0;
                  const heightPct =
                    hasValue && maxBudget > 0
                      ? Math.max((value / maxBudget) * 85, 10)
                      : 0;
                  return (
                    <div
                      key={year}
                      className="flex flex-1 flex-col items-center justify-end gap-1"
                    >
                      {hasValue && (
                        <span className="wv-b7 text-blue-30 whitespace-nowrap">
                          {formatBaht(value)}
                        </span>
                      )}
                      <div
                        className={`w-full rounded-sm bg-blue-20 maincategory__job`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-1 flex gap-1">
                {budgets.map(({ year }) => (
                  <span
                    key={year}
                    className="flex-1 text-center wv-b7 text-gray-40"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function Detail({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="wv-b6 wv-bold text-black">{label}</p>
      <p className="mt-0.5 wv-b6 text-gray-50 whitespace-pre-line">{value}</p>
    </div>
  );
}
