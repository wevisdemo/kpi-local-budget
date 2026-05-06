"use client";
import { useRouter, useSearchParams } from "next/navigation";
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

const ProjectIdea = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const goal = searchParams.get("goal");
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [projectsSheet, setProjectsSheet] = useState<Project[]>([]);
  const [loadedCategory, setLoadedCategory] = useState<string | null>(null);

  const isGoalsLoading = !!category && loadedCategory !== category;

  const IdeaCategory = ideaCategories.find((item) => item.title === category);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const projectCount = goals.reduce(
    (acc, goal) => acc + (Number(goal.project_count) ?? 0),
    0,
  );

  useEffect(() => {
    if (!category) {
      return;
    }
    getGoalsByCategory(category)
      .then((data) => {
        setGoals(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load goals", error);
        setGoals([]);
      })
      .finally(() => {
        setLoadedCategory(category);
      });
    getProjectsByCategory(category)
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        setProjects([]);
      });
    getProject()
      .then((data) => {
        setProjectsSheet(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        setProjectsSheet([]);
      });
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

  const combinedProjects = useMemo<Project[]>(() => {
    const existing: Project[] = projectsSheet
      .filter((item) => !category || item.category_ai === category)
      .map((item) => ({ ...item, type: "exist" }));

    const proposed: Project[] = projects.map((item) => {
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
  }, [projects, projectsSheet, category, goal]);

  const handleGoalChange = (nextGoal: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextGoal === null) {
      params.delete("goal");
    } else {
      params.set("goal", nextGoal);
    }
    const query = params.toString();
    router.push(query ? `?${query}` : "?");
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
                  router.push(`${basePath}/explore-idea`);
                }}
              >
                ภาพรวมไอเดีย
              </Button>
              <p className="wv-h6 wv-bold text-white wv-ibmplexlooped">
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
                  {combinedProjects.length || projectCount} โครงการ
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
                  router.push(`${basePath}/create-idea`);
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
