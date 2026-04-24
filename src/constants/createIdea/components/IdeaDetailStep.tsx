import ProjectCard from "@/src/components/ProjectCard";
import type { Project } from "@/src/services/type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IDEA_MAX_LENGTH = 150;
const PROBLEM_MAX_LENGTH = 150;

type ProjectFilter = "existing" | "proposed";

interface IdeaDetailStepProps {
  problemLabel: string;
  title: string;
  budget: string;
  onChangeTitle: (value: string) => void;
  onChangeBudget: (value: string) => void;
  matchedProjects: Project[];
  isProposingProblem?: boolean;
  onChangeProblemLabel?: (value: string) => void;
}

function formatBudget(value: string) {
  if (!value) return "";
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return number.toLocaleString("en-US");
}

function groupByProject(projects: Project[]): Project[] {
  const groups = new Map<string, Project>();
  const ungrouped: Project[] = [];

  for (const project of projects) {
    const key = project.project;
    if (!key) {
      ungrouped.push(project);
      continue;
    }

    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, { ...project });
      continue;
    }

    groups.set(key, {
      ...existing,
      vote_count: Number(project.vote_count ?? 0),
      project_id: project.project_id,
    });
  }

  return [...groups.values(), ...ungrouped];
}

export default function IdeaDetailStep({
  problemLabel,
  title,
  budget,
  onChangeTitle,
  onChangeBudget,
  matchedProjects,
  isProposingProblem = false,
  onChangeProblemLabel,
}: IdeaDetailStepProps) {
  const handleTitleChange = (value: string) => {
    if (value.length > IDEA_MAX_LENGTH) {
      onChangeTitle(value.slice(0, IDEA_MAX_LENGTH));
      return;
    }
    onChangeTitle(value);
  };

  const handleProblemLabelChange = (value: string) => {
    if (!onChangeProblemLabel) return;
    if (value.length > PROBLEM_MAX_LENGTH) {
      onChangeProblemLabel(value.slice(0, PROBLEM_MAX_LENGTH));
      return;
    }
    onChangeProblemLabel(value);
  };

  const handleBudgetChange = (value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "");
    onChangeBudget(digitsOnly);
  };

  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("existing");

  const existingProjects = groupByProject(
    matchedProjects.filter((project) => project.type !== "propose"),
  );
  const proposedProjects = matchedProjects.filter(
    (project) => project.type === "propose",
  );

  const visibleProjects =
    activeFilter === "proposed" ? proposedProjects : existingProjects;

  return (
    <section className="space-y-4">
      <div className="rounded-[14px] border-2 border-teal-30 bg-white px-5 py-4">
        <p className="wv-b4 wv-ibmplexlooped text-gray-50">เพื่อให้..</p>
        {isProposingProblem ? (
          <div>
            <DottedInput
              value={problemLabel}
              onChange={(value) => handleProblemLabelChange(value)}
              maxLength={PROBLEM_MAX_LENGTH}
              title={true}
            />
            <div className="mt-1 flex justify-end">
              <span className="wv-ibmplexlooped text-xs text-gray-40">
                {problemLabel.length}/{PROBLEM_MAX_LENGTH} ตัวอักษร
              </span>
            </div>
          </div>
        ) : (
          <p className="wv-b3 wv-bold wv-ibmplexlooped mt-1 text-[#00AEBB]">
            {problemLabel || "-"}
          </p>
        )}

        <div className="">
          <label className="block">
            <span className="wv-b4 wv-ibmplexlooped text-gray-50">
              เทศบาลควรทำโครงการ..
            </span>
            <DottedInput
              value={title}
              onChange={handleTitleChange}
              maxLength={IDEA_MAX_LENGTH}
            />
          </label>
          <div className="mt-1 flex justify-end">
            <span className="wv-ibmplexlooped text-xs text-gray-40">
              {title.length}/{IDEA_MAX_LENGTH} ตัวอักษร
            </span>
          </div>
        </div>

        <div className="mt-3">
          <label className="block">
            <span className="wv-b4 wv-ibmplexlooped text-gray-50">
              งบประมาณที่คาดว่าจะใช้{" "}
              <span className="text-gray-40">(ข้ามได้)</span>
            </span>
            <div className="flex items-end gap-2">
              <DottedInput
                value={formatBudget(budget)}
                onChange={handleBudgetChange}
                align="right"
                inputMode="numeric"
                className="flex-1"
              />
              <span className="wv-b5 wv-ibmplexlooped pb-2 text-gray-50">
                บาท
              </span>
            </div>
          </label>
        </div>
      </div>

      {matchedProjects.length > 0 && (
        <div className="space-y-3 pt-4">
          <div className="space-y-2.5 justify-center items-center flex flex-col">
            <h3 className="wv-b4 pb-2 wv-ibmplexlooped text-black flex items-center gap-1.5 flex-wrap">
              <span>หรือกด</span>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon/heart-check.svg`}
                alt="heart"
                width={16}
                height={16}
              />
              <span>สนับสนุนโครงการที่เกี่ยวข้องกับเป้าหมายนี้</span>
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <CountPill
                count={existingProjects.length}
                label="สิ่งที่กำลังจะทำอยู่แล้ว"
                active={activeFilter === "existing"}
                onClick={() => setActiveFilter("existing")}
              />
              <CountPill
                count={proposedProjects.length}
                label="ไอเดียใหม่จากเพื่อนบ้าน"
                active={activeFilter === "proposed"}
                onClick={() => setActiveFilter("proposed")}
              />
            </div>
          </div>
          <div className="space-y-2.5">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.project_id ?? index}
                project={project}
                type={activeFilter === "existing" ? "exist" : "propose"}
                likes={project.vote_count ?? 0}
              />
            ))}
          </div>
          <p className="wv-b6 text-gray-40 wv-ibmplexlooped">
            &apos;สิ่งที่กำลังจะทำอยู่แล้ว&apos; หมายถึง
            สิ่งที่ถูกเขียนไว้ในแผนพัฒนาท้องถิ่น 5 ปี (พ.ศ. 2566-2570) ฉบับแรก
          </p>
        </div>
      )}
    </section>
  );
}

const DOT_CHAR = ".";
const DOT_COUNT = 200;

interface DottedInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  align?: "left" | "right";
  inputMode?: "text" | "numeric";
  className?: string;
  title?: boolean;
}

function DottedInput({
  value,
  onChange,
  maxLength,
  placeholder,
  align = "left",
  inputMode,
  className = "",
  title = false,
}: DottedInputProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (measureRef.current) {
      setTextWidth(measureRef.current.offsetWidth);
    }
  }, [value]);

  const isRight = align === "right";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <span
        ref={measureRef}
        className="wv-ibmplexlooped invisible absolute left-0 top-0 whitespace-pre py-2"
        aria-hidden="true"
      >
        {value}
      </span>
      <div
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="wv-ibmplexlooped block overflow-hidden whitespace-nowrap text-gray-30"
          style={
            isRight
              ? { maxWidth: `calc(100% - ${textWidth}px)` }
              : { paddingLeft: textWidth }
          }
        >
          {DOT_CHAR.repeat(DOT_COUNT)}
        </span>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        inputMode={inputMode}
        className={`wv-ibmplexlooped relative w-full bg-transparent py-2 text-black outline-none placeholder:text-gray-30 ${isRight ? "text-right" : ""} ${title ? "text-[#00AEBB]! wv-b3 wv-bold " : ""}`}
      />
    </div>
  );
}

interface CountPillProps {
  count: number;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function CountPill({ count, label, active = false, onClick }: CountPillProps) {
  const baseClass =
    "inline-flex items-center rounded-[10px] border px-[10px] py-[5px] wv-ibmplexlooped wv-b5 whitespace-nowrap transition-colors";
  const stateClass = active
    ? "border-gray-30 bg-white text-black"
    : "border-gray-30 text-gray-50";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${baseClass} ${stateClass}`}
    >
      <span className="inline-flex items-center justify-center rounded-full px-1.5 wv-b6">
        {count}
      </span>
      {label}
    </button>
  );
}
