"use client";

import { useState } from "react";
import type { Plan } from "@/src/services/type";
import dayjs from "dayjs";
import th from "dayjs/locale/th";
import { formatBaht as formatBahtLib } from "@/src/lib/formatBath";

interface ProjectCardPlanProps {
  project: Plan;
  color: string;
}

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

export default function ProjectCardPlan({
  project,
  color,
}: ProjectCardPlanProps) {
  const [expanded, setExpanded] = useState(false);
  const totalBudget = project.budget ?? 0;
  dayjs.locale(th);
  return (
    <article
      className="rounded-[10px] border-2 bg-white p-4 wv-ibmplexlooped shadow-md"
      style={{ borderColor: color }}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="wv-b4 wv-bold text-black">{project.project ?? "-"}</h3>
          {project.substrategy && (
            <div className="mt-1 wv-b5 text-gray-40">
              <p className="">กลยุทธ์: {project.substrategy}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end flex-1">
          <p className="wv-b2 wv-bold wv-ibmplexlooped" style={{ color }}>
            {formatBahtLib(totalBudget)}
          </p>
          <p
            className="wv-b5 wv-ibmplexlooped text-right text-nowrap"
            style={{ color }}
          >
            ล้านบาท
          </p>
        </div>
      </header>

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
          <p className=" wv-b6 text-black wv-bold">
            รายละเอียดของกิจกรรมที่เกิดขึ้นจากโครงการ
          </p>
          <p className="wv-b5 text-black wv-ibmplexlooped whitespace-pre-line mb-3">
            {project.detail}
          </p>

          {(project.strategy || project.plan) && (
            <div className="grid grid-cols-2 gap-3">
              {project.strategy && (
                <Detail label="ยุทธศาสตร์" value={project.strategy} />
              )}
              {project.plan && <Detail label="แผนงาน" value={project.plan} />}
            </div>
          )}

          {project.location && (
            <Detail
              className="mt-3"
              label="สถานที่ดำเนินการ"
              value={project.location}
            />
          )}

          {project.organization && (
            <Detail
              className="mt-3"
              label="หน่วยงานรับผิดชอบ"
              value={project.organization}
            />
          )}

          {project.deadline && (
            <Detail
              className="mt-3"
              label="ดำเนินการแล้วเสร็จ"
              value={project.deadline}
            />
          )}
          {totalBudget > 0 && (
            <Detail
              className="mt-3"
              color={color}
              label="งบประมาณ (บาท)"
              value={formatBaht(totalBudget ?? 0)}
            />
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
  color = "",
}: {
  label: string;
  value: string;
  className?: string;
  color?: string;
}) {
  return (
    <div className={className}>
      <p
        className={`wv-b6 wv-bold `}
        style={{ color: color ? color : "black" }}
      >
        {label}
      </p>
      <p
        className={`mt-0.5 wv-b6 whitespace-pre-line `}
        style={{ color: color ? color : "black" }}
      >
        {value}
      </p>
    </div>
  );
}
