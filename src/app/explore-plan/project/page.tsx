import { Suspense } from "react";
import PlanIdea from "@/src/constants/planIdea";

export default function ProjectIdeaPage() {
  return (
    <Suspense fallback={null}>
      <PlanIdea />
    </Suspense>
  );
}
