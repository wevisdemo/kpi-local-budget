"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ideaCategories } from "../createIdea/data";
import Image from "next/image";
import Button from "@/src/components/Button";
import Dropdown from "@/src/components/Dropdown";
import {
  ProjectRecord,
  getGoalsByCategory,
} from "@/src/services/submitTransaction";
import { Goal } from "@/src/services/type";
import { getProjectsByCategory } from "@/src/services/exploreIdea";
import { Project } from "@/src/services/type";
import { getProject } from "@/src/lib/getProject";
import ProjectCardIdea from "@/src/components/ProjectCardIdea";
import { projectCategories } from "./data";
import { basePath } from "@/src/lib/basePath";

const buildCombinedProjects = (
  projects: ProjectRecord[],
  projectsSheet: Project[],
  category: string | null,
  goal: string | null,
): Project[] => {
  const proposedNames = new Set(
    projects
      .map((item) => item.project)
      .filter((name): name is string => !!name),
  );

  const existing: Project[] = projectsSheet
    .filter((item) => !category || item.category_ai === category)
    .filter((item) => !item.project || !proposedNames.has(item.project))
    .filter((item) => item.vote_count != null && item.vote_count > 0)
    .map((item) => ({ ...item, type: "exist" }));

  const proposed: Project[] = projects
    .filter(
      (item) =>
        (item.vote_count != null && item.vote_count > 0) ||
        item.creator_id != null,
    )
    .map((item) => {
      const sheetMatch = projectsSheet.find(
        (sheet) => sheet.project && sheet.project === item.project,
      );
      const type: Project["type"] =
        item.creator_id != null ? "propose" : "exist";

      if (sheetMatch) {
        return {
          ...sheetMatch,
          project_id: item.Id != null ? String(item.Id) : sheetMatch.project_id,
          vote_count: Number(item.vote_count ?? 0),
          type,
        };
      }

      return {
        project_id: item.Id != null ? String(item.Id) : undefined,
        project: item.project,
        goal_ai: item.goal,
        budget_70: Number(item.budget),
        vote_count: Number(item.vote_count ?? 0),
        type,
      };
    });

  const all = [...existing, ...proposed];

  if (!goal) return all;

  return all.filter((item) => {
    const goalText = item.goal_ai ?? item.goal_original ?? "";
    return goalText === goal;
  });
};

const ProjectIdea = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = searchParams.get("category");
  const router = useRouter();
  const [goal, setGoal] = useState<string | null>(
    () => searchParams.get("goal") || null,
  );
  const [goals, setGoals] = useState<Goal[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [projectsSheet, setProjectsSheet] = useState<Project[]>([]);
  const [loadedCategory, setLoadedCategory] = useState<string | null>(null);

  const isGoalsLoading = !!category && loadedCategory !== category;

  const IdeaCategory = ideaCategories.find((item) => item.title === category);
  const projectCount = goals.reduce(
    (acc, goal) => acc + (Number(goal.project_count) ?? 0),
    0,
  );

  const color = projectCategories.find(
    (item) => item.title === category,
  )?.color;

  const getGoalsFunction = async () => {
    const data = await getGoalsByCategory(category ?? "");
    setGoals(Array.isArray(data) ? data : []);
    setLoadedCategory(category);
  };

  const getProjectsFunction = async () => {
    const data = await getProjectsByCategory(category ?? "");
    setProjects(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (!category) {
      return;
    }
    let active = true;

    getGoalsByCategory(category).then((data) => {
      if (active) {
        setGoals(Array.isArray(data) ? data : []);
        setLoadedCategory(category);
      }
    });

    getProjectsByCategory(category).then((data) => {
      if (active) setProjects(Array.isArray(data) ? data : []);
    });

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

  const goalOptions = useMemo(
    () =>
      goals
        .filter((item) => item.goal)
        .map((item) => ({
          value: item.goal as string,
          label: item.goal as string,
        })),
    [goals],
  );

  const combinedProjects = buildCombinedProjects(
    projects,
    projectsSheet,
    category,
    goal,
  );

  // console.log(combinedProjects, category, goal, projects);

  const handleGoalChange = (nextGoal: string | null) => {
    setGoal(nextGoal);
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (nextGoal === null) {
      params.delete("goal");
    } else {
      params.set("goal", nextGoal);
    }
    const query = params.toString();
    const url = `${basePath}${pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState(null, "", url);
  };
  if (isGoalsLoading) {
    return null;
  }

  return (
    <>
      {goals.length > 0 ? (
        <div
          className={`relative w-full maincategory__${IdeaCategory?.id} min-h-screen`}
        >
          <div className="relative max-w-[1040px] mx-auto py-20 px-5 lg:px-0 flex flex-col gap-2.5">
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
                  router.push(`/explore-idea`);
                }}
              >
                ภาพรวมไอเดีย
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
              <div className="flex flex-col ">
                <p className="wv-b3 wv-bold text-white wv-ibmplexlooped">
                  {combinedProjects.length || 0} โครงการ
                </p>
                <p className="wv-b5 text-white wv-ibmplexlooped">
                  เรียงตามจำนวนคนสนับสนุน
                </p>
              </div>
              {combinedProjects.map((project) => (
                <ProjectCardIdea
                  key={project.project_id}
                  project={project}
                  likes={project.vote_count ?? 0}
                  onRefetch={() => {
                    getProjectsFunction();
                    getGoalsFunction();
                  }}
                  color={color ?? ""}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative w-full bg-yellow-10 min-h-screen`}>
          <div className="relative max-w-[1040px] mx-auto py-20 px-5 lg:px-0 flex flex-col gap-2.5">
            <p className="wv-h5 wv-ibmplexlooped text-black wv-bold ">
              สำรวจเพื่อ &apos;สนับสนุนไอเดีย&apos; จากเพื่อนในท้องถิ่นคุณ
            </p>
            <div className="flex flex-col gap-2.5 mt-20 text-center items-center justify-center">
              <p className="wv-h5 wv-ibmplexlooped text-gray-50">
                ยังไม่มีไอเดีย
              </p>
              <p className="wv-b4 wv-ibmplexlooped text-gray-50">เสนอได้ที่</p>
              <Button
                variant="primary"
                size="big"
                theme="dark"
                className="w-fit"
                leftIcon={null}
                onClick={() => {
                  router.push(`/create-idea`);
                }}
              >
                ปั้นไอเดีย
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectIdea;
