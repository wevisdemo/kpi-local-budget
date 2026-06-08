"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import { Plan } from "@/src/services/type";
import { formatBaht } from "@/src/lib/formatBath";
import { TabBar } from "./components/TabBar";
import { getPlanSheet } from "@/src/lib/getPlan";
import { usePlanColorStore } from "@/src/stores/usePlanColorStore";
import ProjectCardPlan from "@/src/components/ProjectCardPlan";

function projectMatchesGoal(project: Plan, goal: string): boolean {
  const lines =
    project.substrategy
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];
  return lines.includes(goal);
}

const PlanProject = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = searchParams.get("category");
  const router = useRouter();
  const goal = searchParams.get("goal") || null;
  const [planSheets, setPlanSheets] = useState<Plan[]>([]);

  const color = usePlanColorStore((state) =>
    category ? state.colorByCategory[category] : undefined,
  );

  useEffect(() => {
    if (!category) {
      return;
    }
    let active = true;

    getPlanSheet()
      .then((data) => {
        if (active) setPlanSheets(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        if (active) setPlanSheets([]);
      });

    return () => {
      active = false;
    };
  }, [category]);

  const categoryProjects = useMemo(() => {
    if (!category) return planSheets;
    return planSheets.filter((project) => project.strategy === category);
  }, [planSheets, category]);

  const filteredProjects = useMemo(() => {
    if (!goal) return categoryProjects;
    return categoryProjects.filter((project) =>
      projectMatchesGoal(project, goal),
    );
  }, [categoryProjects, goal]);

  const handleGoalChange = (nextGoal: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextGoal === null) {
      params.delete("goal");
    } else {
      params.set("goal", nextGoal);
    }
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const goalOptions = useMemo(() => {
    const uniqueGoals = new Set<string>();
    for (const project of categoryProjects) {
      const lines =
        project.substrategy?.split("\n").map((line) => line.trim()) ?? [];
      for (const line of lines) {
        if (line) uniqueGoals.add(line);
      }
    }
    return Array.from(uniqueGoals)
      .sort((a, b) => a.localeCompare(b, "th"))
      .map((title) => ({ value: title, label: title }));
  }, [categoryProjects]);

  return (
    <div
      className={`relative w-full min-h-screen`}
      style={{ backgroundColor: color }}
    >
      <div className="bg-white">
        <TabBar active={"action"} onChange={() => {}} />
      </div>
      <div className="relative max-w-[1040px] mx-auto md:py-20 py-10 px-5 lg:px-0 flex flex-col gap-2.5">
        <div className="relative z-10 flex flex-col gap-2.5">
          <Button
            variant="secondary"
            size="small"
            theme="light"
            className="w-fit"
            rightIcon={null}
            onClick={() => {
              router.push(`/explore-plan?tab=action`);
            }}
          >
            ภาพรวมแผน
          </Button>
          <p className="wv-h6 wv-bold text-white wv-ibmplexlooped text-balance">
            {category}
          </p>
          <div className="flex flex-col gap-[3px]">
            <p className="wv-b5 wv-bold wv-ibmplexlooped text-white">
              เป้าหมาย
            </p>
            <Dropdown
              options={goalOptions}
              value={goal}
              onChange={handleGoalChange}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <p className="wv-b3 wv-bold text-white wv-ibmplexlooped">
                {filteredProjects.length} โครงการ
              </p>
              <p className="wv-b5 text-white wv-ibmplexlooped">
                เรียงตามจำนวนงบประมาณ
              </p>
            </div>
            <p className="wv-b3 text-white wv-ibmplexlooped">
              {formatBaht(
                filteredProjects.reduce(
                  (acc, project) => acc + (project.budget ?? 0),
                  0,
                ),
              )}{" "}
              ล้านบาท
            </p>
          </div>

          {filteredProjects.map((project) => (
            <ProjectCardPlan
              key={project.project_id}
              project={project}
              color={color ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanProject;
