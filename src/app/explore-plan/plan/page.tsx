import { Suspense } from "react";
import PlanProject from "@/src/constants/planProject";

export default function PlanProjectPage() {
  return (
    <Suspense fallback={null}>
      <PlanProject />
    </Suspense>
  );
}
