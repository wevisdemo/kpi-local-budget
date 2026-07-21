"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ideaCategories } from "../data";
import { PROPOSE_NEW_PROBLEM, type CreateIdeaStep } from "../types";
import { getProject } from "@/src/lib/getProject";
import {
  findCategoryByTitle,
  formatTransactionTimestamp,
  getGoalsByCategory,
  getProjectsByGoal,
  submitBatch,
  type BatchRequest,
} from "@/src/services/submitTransaction";
import type { Project } from "@/src/services/type";
import { useCookieConsentStore } from "@/src/stores/useCookieConsentStore";
import { useFavoritesStore } from "@/src/stores/useFavoritesStore";
import { currentSite } from "@/src/config/sites";

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
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isPoppingRef = useRef(false);
  const didInitHistoryRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const baseState =
      (window.history.state as Record<string, unknown> | null) ?? {};
    const merged = { ...baseState, createIdeaStep: step };

    if (!didInitHistoryRef.current) {
      didInitHistoryRef.current = true;
      window.history.replaceState(merged, "");
      return;
    }

    if (isPoppingRef.current) {
      isPoppingRef.current = false;
      return;
    }

    window.history.pushState(merged, "");
  }, [step]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = (event: PopStateEvent) => {
      const target = (event.state as { createIdeaStep?: unknown } | null)
        ?.createIdeaStep;
      if (typeof target === "number" && target >= 1 && target <= 5) {
        isPoppingRef.current = true;
        setStep(target as CreateIdeaStep);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
            timestamp: record.timestamp ?? "",
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
    (step === 2 &&
      Boolean(selectedProblemId) &&
      (!isProposingNewProblem || Boolean(customProblemLabel.trim()))) ||
    step === 3 ||
    (step === 4 && Boolean(turnstileToken)) ||
    step === 5;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  const goNext = () => {
    if (!isStepValid || step >= 5) {
      return;
    }

    setStep((prev) => (prev + 1) as CreateIdeaStep);
    scrollToTop();
  };

  const goBack = () => {
    if (step <= 1) {
      return;
    }

    if (typeof window !== "undefined") {
      window.history.back();
      scrollToTop();
      return;
    }

    setStep((prev) => (prev - 1) as CreateIdeaStep);
    scrollToTop();
  };

  const handleSubmitIdea = async () => {
    if (!isStepValid || step !== 4 || isSubmitting) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const timestamp = formatTransactionTimestamp();
      const token = turnstileToken ?? "";
      const userId = consentId ?? "";

      const category = selectedCategory?.title
        ? await findCategoryByTitle(selectedCategory.title)
        : null;
      const categoryId = category?.Id;

      const likeRequestIndex = 0;
      const createRequests: BatchRequest[] = [
        {
          path: `/${currentSite.nocoDb}_Goal_Like`,
          method: "POST",
          body: {
            user_id: userId,
            timestamp,
            goal: effectiveProblemLabel || "",
          },
        },
      ];

      let projectRequestIndex: number | null = null;
      let goalRequestIndex: number | null = null;

      if (isProposingNewProblem) {
        goalRequestIndex = createRequests.length;
        createRequests.push({
          path: `/${currentSite.nocoDb}_Goal`,
          method: "POST",
          body: {
            goal: effectiveProblemLabel,
            category: selectedCategory?.title ?? "",
            creator_id: userId,
            timestamp,
            vote_count: 0,
            hidden: false,
          },
        });
      }

      if (ideaTitle) {
        projectRequestIndex = createRequests.length;
        createRequests.push({
          path: `/${currentSite.nocoDb}_Project`,
          method: "POST",
          body: {
            project: ideaTitle,
            budget: Number(ideaBudget) || 0,
            goal: effectiveProblemLabel,
            creator_id: userId,
            timestamp,
            vote_count: 0,
            hidden: false,
          },
        });
      }

      const createResults = await submitBatch(createRequests, token);

      const extractId = (index: number | null): string | null => {
        if (index == null) return null;
        const body = createResults[index]?.body as
          | { Id?: string | number }
          | undefined;
        return body?.Id != null ? String(body.Id) : null;
      };

      const projectId = extractId(projectRequestIndex);
      const goalId = extractId(goalRequestIndex);
      const likeId = extractId(likeRequestIndex);

      const targetGoalId = (goalId ?? effectiveProblemLabelId) || null;

      const linkRequests: BatchRequest[] = [];

      if (likeId && targetGoalId) {
        linkRequests.push({
          path: `/${currentSite.nocoDb}_Goal/${targetGoalId}/hm/vote_count/${likeId}`,
          method: "POST",
        });
      }

      if (isProposingNewProblem && goalId && categoryId != null) {
        linkRequests.push({
          path: `/${currentSite.nocoDb}_Category/${categoryId}/hm/goal_count/${goalId}`,
          method: "POST",
        });
      }

      if (ideaTitle && projectId) {
        if (isProposingNewProblem) {
          if (goalId) {
            linkRequests.push({
              path: `/${currentSite.nocoDb}_Goal/${goalId}/hm/project_count/${projectId}`,
              method: "POST",
            });
          }

          if (categoryId != null) {
            linkRequests.push({
              path: `/${currentSite.nocoDb}_Category/${categoryId}/hm/project_count/${projectId}`,
              method: "POST",
            });
          }
        } else if (categoryId != null) {
          linkRequests.push({
            path: `/${currentSite.nocoDb}_Category/${categoryId}/hm/project_count/${projectId}`,
            method: "POST",
          });
          if (effectiveProblemLabelId) {
            linkRequests.push({
              path: `/${currentSite.nocoDb}_Goal/${effectiveProblemLabelId}/hm/project_count/${projectId}`,
              method: "POST",
            });
          }
        }
      }

      if (linkRequests.length > 0) {
        await submitBatch(linkRequests, token);
      }

      if (likeId && targetGoalId) {
        toggleFavorite(targetGoalId);
      }

      setStep(5);
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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight - 100,
      behavior: "smooth",
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedProblemId(null);
    setCustomProblemLabel("");
    scrollToBottom();
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
    scrollToBottom,
  };
}
// if (effectiveProblemLabelId) {
//   requests.push({
//     path: `/Goal/${effectiveProblemLabelId}/hm/project_count/${projectRef}`,
//     method: "POST",
//   });
// }
