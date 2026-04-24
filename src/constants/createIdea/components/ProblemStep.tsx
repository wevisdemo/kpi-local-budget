import Tag from "@/src/components/Tag";
import type { Project } from "@/src/services/type";
import { PROPOSE_NEW_PROBLEM } from "../types";

interface ProblemStepProps {
  categoryId: string;
  categoryTitle: string;
  problems: Project[];
  selectedProblemId: string | null;
  onSelectProblem: (problemId: string) => void;
}

export default function ProblemStep({
  categoryId,
  categoryTitle,
  problems,
  selectedProblemId,
  onSelectProblem,
}: ProblemStepProps) {
  const isProposing = selectedProblemId === PROPOSE_NEW_PROBLEM;

  return (
    <section>
      <div className="space-y-2">
        {problems.length === 0 ? (
          <p className="wv-b5 wv-ibmplexlooped text-gray-30">
            ยังไม่มีเป้าหมายในประเด็นนี้
          </p>
        ) : (
          problems.map((problem, index) => {
            const goal = problem.goal_ai?.trim() ?? "";
            const isSelected = selectedProblemId === goal;

            return (
              <button
                key={problem.project_id ?? `${goal}-${index}`}
                type="button"
                onClick={() => onSelectProblem(goal)}
                className={`w-full rounded-[10px] border p-5 text-left transition maincategory__${categoryId} ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex flex-col gap-[10px]">
                  <p className="wv-b3 wv-bold wv-ibmplexlooped text-white">
                    {goal}
                  </p>
                  <Tag
                    variant={problem.type === "propose" ? "propose" : "exist"}
                    size="small"
                  >
                    {problem.type === "propose"
                      ? "ไอเดียใหม่"
                      : "สิ่งที่กำลังจะทำอยู่แล้ว"}
                  </Tag>
                </div>
              </button>
            );
          })
        )}
        <button
          type="button"
          onClick={() => onSelectProblem(PROPOSE_NEW_PROBLEM)}
          className={`w-full rounded-[10px] border-2 border-dashed p-5 text-left transition ${
            isProposing
              ? "border-teal-30 bg-teal-10"
              : "border-teal-30/60 bg-transparent hover:border-teal-30"
          }`}
        >
          <p className="wv-b3 wv-bold wv-ibmplexlooped text-teal-30">
            + เสนอเป้าหมายใหม่
          </p>
          <p className="wv-b5 wv-ibmplexlooped mt-1 text-gray-40">
            ในประเด็น{categoryTitle}
          </p>
        </button>
        <p className="wv-b6 text-gray-40 wv-ibmplexlooped">
          &apos;สิ่งที่กำลังจะทำอยู่แล้ว&apos; หมายถึง
          สิ่งที่ถูกเขียนไว้ในแผนพัฒนาท้องถิ่น 5 ปี (พ.ศ. 2566-2570) ฉบับแรก
        </p>
      </div>
    </section>
  );
}
