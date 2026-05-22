import { Suspense } from "react";
import ExplorePlan from "@/src/constants/explorPlan";

export default function ExplorePlanPage() {
  return (
    <Suspense fallback={null}>
      <ExplorePlan />
    </Suspense>
  );
}
