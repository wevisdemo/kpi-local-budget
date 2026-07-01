"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ideaCategories } from "../createIdea/data";
import Image from "next/image";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import { Project } from "@/src/services/type";
import { getProject } from "@/src/lib/getProject";
import { projectCategories } from "./data";
import ProjectCardIdeaPlan from "@/src/components/ProjectCardIdeaPlan";
import { formatBaht } from "@/src/lib/formatBath";
import { basePath } from "@/src/lib/basePath";
import { TabBar } from "./components/TabBar";

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

function projectMatchesGoal(project: Project, goal: string): boolean {
  const lines =
    project.goal_ai
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];
  return lines.includes(goal);
}

function getProjectTotalBudget(project: Project): number {
  return (
    (project.budget_70 ?? 0) +
    (project.budget_69 ?? 0) +
    (project.budget_68 ?? 0) +
    (project.budget_67 ?? 0) +
    (project.budget_66 ?? 0)
  );
}

const PlanIdea = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = searchParams.get("category");
  const router = useRouter();
  const goal = searchParams.get("goal") || null;
  const [projectsSheet, setProjectsSheet] = useState<Project[]>([]);

  const IdeaCategory = ideaCategories.find((item) => item.title === category);
  const color = projectCategories.find(
    (item) => item.title === category,
  )?.color;

  useEffect(() => {
    if (!category) {
      return;
    }
    let active = true;

    getProject()
      .then((data) => {
        if (active) setProjectsSheet(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        if (active) setProjectsSheet([]);
      });

    return () => {
      active = false;
    };
  }, [category]);

  const categoryProjects = useMemo(() => {
    if (!category) return projectsSheet;
    return projectsSheet.filter(
      (project) =>
        categoryTitleFromCategoryAi(project.category_ai) === category,
    );
  }, [projectsSheet, category]);

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
        project.goal_ai?.split("\n").map((line) => line.trim()) ?? [];
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
      className={`relative w-full maincategory__${IdeaCategory?.id} min-h-screen`}
    >
      <div className="bg-white">
        <TabBar active={"local"} onChange={() => {}} />
      </div>
      <div className="relative max-w-[1040px] mx-auto md:py-20 py-10 px-5 lg:px-0 flex flex-col gap-2.5">
        <div className="absolute top-[40px] left-0 w-full h-full lg:top-[60px] z-0 pointer-events-none">
          <Image
            src={`${basePath}/img/${IdeaCategory?.id}.png`}
            alt={IdeaCategory?.title ?? ""}
            width={100}
            height={100}
            className="max-w-[600px] w-full mx-auto"
          />
        </div>
        <div className="relative z-10 flex flex-col gap-2.5">
          <Button
            variant="secondary"
            size="small"
            theme="light"
            className="w-fit"
            rightIcon={null}
            onClick={() => {
              router.push(`/explore-plan/?tab=local`);
            }}
          >
            ภาพรวมแผน
          </Button>
          <p className="wv-h6 wv-bold text-white wv-ibmplexlooped text-balance">
            {IdeaCategory?.title}
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
                  (acc, project) => acc + getProjectTotalBudget(project),
                  0,
                ),
              )}{" "}
              ล้านบาท
            </p>
          </div>

          {filteredProjects
            .sort(
              (a, b) => getProjectTotalBudget(b) - getProjectTotalBudget(a),
            )
            .map((project, index) => (
              <ProjectCardIdeaPlan
                key={`${project.project_id}-${index}`}
                project={project}
                color={color ?? ""}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlanIdea;
