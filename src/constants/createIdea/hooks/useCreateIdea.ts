"use client";

import { useEffect, useMemo, useState } from "react";
import { ideaCategories } from "../data";
import { PROPOSE_NEW_PROBLEM, type CreateIdeaStep } from "../types";
import { getProject } from "@/src/lib/getProject";
import {
  findCategoryByTitle,
  formatTransactionTimestamp,
  getGoalsByCategory,
  getProjectsByGoal,
  linkGoalToCategory,
  linkProjectToCategory,
  linkProjectToGoal,
  submitGoal,
  submitProject,
  submitTransaction,
} from "@/src/services/submitTransaction";
import type { Project } from "@/src/services/type";
import { useCookieConsentStore } from "@/src/stores/useCookieConsentStore";
import { useFavoritesStore } from "@/src/stores/useFavoritesStore";

export function useCreateIdea() {
  const [step, setStep] = useState<CreateIdeaStep>(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null,
  );
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaBudget, setIdeaBudget] = useState("");
  const [customProblemLabel, setCustomProblemLabel] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [proposedGoals, setProposedGoals] = useState<Project[]>([]);
  const [proposedProjects, setProposedProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const consentId = useCookieConsentStore((state) => state.consentId);
  const favorites = useFavoritesStore((state) => state.favorites);

  useEffect(() => {
    let cancelled = false;
    getProject()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCategory = useMemo(
    () =>
      ideaCategories.find((category) => category.id === selectedCategoryId) ??
      null,
    [selectedCategoryId],
  );

  useEffect(() => {
    if (!selectedCategory) {
      setProposedGoals([]);
      return;
    }

    let cancelled = false;
    const targetTitle = selectedCategory.title.trim();

    getGoalsByCategory(targetTitle)
      .then((goals) => {
        if (cancelled) return;
        const mapped: Project[] = goals.reduce<Project[]>((acc, goal) => {
          const text = goal.goal?.trim() ?? "";
          if (!text) return acc;
          acc.push({
            project_id: goal.Id != null ? String(goal.Id) : undefined,
            goal_ai: text,
            category_ai: goal.category ?? targetTitle,
            type: goal.creator_id != null ? "propose" : "exist",
            vote_count: goal.vote_count ?? 0,
          });
          return acc;
        }, []);
        setProposedGoals(mapped);
      })
      .catch((error) => {
        console.error("Failed to load proposed goals", error);
        if (!cancelled) setProposedGoals([]);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  const availableProblems = useMemo<Project[]>(() => {
    if (!selectedCategory) return [];

    const seen = new Set<string>();
    const result: Project[] = [];

    proposedGoals.forEach((goal) => {
      const text = goal.goal_ai?.trim();
      if (!text || seen.has(text)) return;
      seen.add(text);
      result.push(goal);
    });

    return result;
  }, [proposedGoals, selectedCategory]);

  const isProposingNewProblem = selectedProblemId === PROPOSE_NEW_PROBLEM;

  const selectedProblem = availableProblems.find(
    (problem) => problem.goal_ai?.trim() === selectedProblemId,
  );

  const effectiveProblemLabel = isProposingNewProblem
    ? customProblemLabel
    : (selectedProblem?.goal_ai ?? "");

  const effectiveProblemLabelId = proposedGoals
    ? (proposedGoals.find((goal) => goal.goal_ai?.trim() === selectedProblemId)
        ?.project_id ?? "")
    : (selectedProblem?.goal_ai?.trim() ?? "");

  useEffect(() => {
    if (!selectedProblemId || isProposingNewProblem) {
      setProposedProjects([]);
      return;
    }

    let cancelled = false;
    const targetGoal = selectedProblemId.trim();

    getProjectsByGoal(targetGoal)
      .then((records) => {
        if (cancelled) return;
        const mapped: Project[] = records.reduce<Project[]>((acc, record) => {
          const name = record.project?.trim();
          if (!name) return acc;
          acc.push({
            project_id: record.Id != null ? String(record.Id) : undefined,
            project: name,
            goal_ai: record.goal ?? targetGoal,
            budget_70: Number(record.budget),
            vote_count: record.vote_count ?? 0,
            type: record.creator_id != null ? "propose" : "exist",
          });
          return acc;
        }, []);
        setProposedProjects(mapped);
      })
      .catch((error) => {
        console.error("Failed to load proposed projects", error);
        if (!cancelled) setProposedProjects([]);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProblemId, isProposingNewProblem]);

  const matchedProjects = useMemo(() => {
    if (!selectedProblemId || isProposingNewProblem) return [];
    const existing = projects.filter(
      (project) => project.goal_ai?.trim() === selectedProblemId,
    );
    return [...existing, ...proposedProjects];
  }, [projects, proposedProjects, selectedProblemId, isProposingNewProblem]);

  const supportCount = useMemo(
    () =>
      matchedProjects.filter(
        (project) => project.project_id && favorites[project.project_id],
      ).length,
    [matchedProjects, favorites],
  );

  const isStepValid =
    (step === 1 && Boolean(selectedCategoryId)) ||
    (step === 2 && Boolean(selectedProblemId)) ||
    step === 3 ||
    (step === 4 && Boolean(turnstileToken)) ||
    step === 5;

  const goNext = () => {
    if (!isStepValid || step >= 5) {
      return;
    }

    setStep((prev) => (prev + 1) as CreateIdeaStep);
  };

  const goBack = () => {
    if (step <= 1) {
      return;
    }

    setStep((prev) => (prev - 1) as CreateIdeaStep);
  };

  const handleSubmitIdea = async () => {
    if (!isStepValid || step !== 4 || isSubmitting) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const timestamp = formatTransactionTimestamp();
      await submitTransaction(
        {
          user_id: consentId ?? "",
          timestamp,
          goal: effectiveProblemLabel || "",
          project: ideaTitle || "",
        },
        turnstileToken ?? "",
      );
      if (ideaTitle) {
        const createdProject = await submitProject(
          {
            project: ideaTitle,
            budget: Number(ideaBudget) || 0,
            goal: effectiveProblemLabel,
            creator_id: consentId ?? "",
            timestamp,
            vote_count: 0,
            hidden: false,
          },
          turnstileToken ?? "",
        );
        if (isProposingNewProblem) {
          const createdGoal = await submitGoal(
            {
              goal: effectiveProblemLabel,
              category: selectedCategory?.title ?? "",
              creator_id: consentId ?? "",
              timestamp,
              vote_count: 0,
              hidden: false,
            },
            turnstileToken ?? "",
          );

          if (createdGoal?.Id && createdProject?.Id) {
            await linkProjectToGoal(
              createdGoal.Id,
              createdProject.Id,
              turnstileToken ?? "",
            );
            if (selectedCategory?.title) {
              const category = await findCategoryByTitle(
                selectedCategory.title,
              );
              if (category?.Id) {
                await linkProjectToCategory(
                  category.Id,
                  createdProject.Id,
                  turnstileToken ?? "",
                );
                await linkGoalToCategory(
                  category.Id,
                  createdGoal.Id,
                  turnstileToken ?? "",
                );
              }
            }
          }
        } else if (selectedCategory?.title && createdProject?.Id) {
          const category = await findCategoryByTitle(selectedCategory.title);
          if (category?.Id) {
            await linkProjectToCategory(
              category.Id,
              createdProject.Id,
              turnstileToken ?? "",
            );
          }
          if (effectiveProblemLabelId && createdProject?.Id) {
            await linkProjectToGoal(
              effectiveProblemLabelId,
              createdProject.Id,
              turnstileToken ?? "",
            );
          }
        }
        setStep(5);
      } else {
        setStep(5);
      }
    } catch (error) {
      console.error("Failed to submit idea", error);
      setSubmitError(
        error instanceof Error ? error.message : "ส่งไอเดียไม่สำเร็จ",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedCategoryId(null);
    setSelectedProblemId(null);
    setIdeaTitle("");
    setIdeaBudget("");
    setCustomProblemLabel("");
    setTurnstileToken(null);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedProblemId(null);
    setCustomProblemLabel("");
  };

  return {
    step,
    selectedCategoryId,
    selectedCategory,
    selectedProblemId,
    ideaTitle,
    ideaBudget,
    customProblemLabel,
    availableProblems,
    isProposingNewProblem,
    effectiveProblemLabel,
    effectiveProblemLabelId,
    matchedProjects,
    supportCount,
    isStepValid,
    isSubmitting,
    submitError,
    setIdeaTitle,
    setIdeaBudget,
    setCustomProblemLabel,
    setSelectedProblemId,
    setTurnstileToken,
    handleSelectCategory,
    goNext,
    goBack,
    handleSubmitIdea,
    resetFlow,
  };
}
