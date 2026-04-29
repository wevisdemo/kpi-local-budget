import { Suspense } from "react";
import ProjectIdea from "@/src/constants/projectIdea";

export default function ProjectIdeaPage() {
  return (
    <Suspense fallback={null}>
      <ProjectIdea />
    </Suspense>
  );
}
