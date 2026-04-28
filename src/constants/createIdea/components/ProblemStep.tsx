import Tag from "@/src/components/Tag";
import type { Project } from "@/src/services/type";
import { PROPOSE_NEW_PROBLEM } from "../types";
import Button from "@/src/components/Button";

const PROBLEM_MAX_LENGTH = 50;

interface ProblemStepProps {
  categoryId: string;
  categoryTitle: string;
  problems: Project[];
  selectedProblemId: string | null;
  customProblemLabel: string;
  onSelectProblem: (problemId: string | null) => void;
  onChangeCustomProblemLabel: (value: string) => void;
  onConfirmCustomProblem: () => void;
}

export default function ProblemStep({
  categoryId,
  categoryTitle,
  problems,
  selectedProblemId,
  customProblemLabel,
  onSelectProblem,
  onChangeCustomProblemLabel,
  onConfirmCustomProblem,
}: ProblemStepProps) {
  const isProposing = selectedProblemId === PROPOSE_NEW_PROBLEM;
  const trimmedCustomProblem = customProblemLabel.trim();

  const handleCustomProblemChange = (value: string) => {
    if (value.length > PROBLEM_MAX_LENGTH) {
      onChangeCustomProblemLabel(value.slice(0, PROBLEM_MAX_LENGTH));
      return;
    }

    onChangeCustomProblemLabel(value);
  };

  const handleSelectPropose = () => {
    onSelectProblem(PROPOSE_NEW_PROBLEM);
  };

  const handleCancelPropose = () => {
    onChangeCustomProblemLabel("");
    onSelectProblem(null);
  };

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
                  isSelected ? "border-zinc-900 border-2" : ""
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
        {!isProposing && (
          <button
            type="button"
            onClick={handleSelectPropose}
            className="w-full rounded-[10px] border-2 border-dashed border-teal-30/60 bg-transparent p-5 text-left transition hover:border-teal-30"
          >
            <p className="wv-b3 wv-bold wv-ibmplexlooped text-teal-30">
              + เสนอเป้าหมายใหม่
            </p>
            <p className="wv-b5 wv-ibmplexlooped mt-1 text-gray-40">
              ในประเด็น{categoryTitle}
            </p>
          </button>
        )}
        {isProposing && (
          <div className={`rounded-[16px] maincategory__${categoryId} p-5`}>
            <label className="block">
              <span className="sr-only">เสนอเป้าหมายใหม่</span>
              <textarea
                value={customProblemLabel}
                onChange={(event) =>
                  handleCustomProblemChange(event.target.value)
                }
                maxLength={PROBLEM_MAX_LENGTH}
                rows={3}
                autoFocus
                className="wv-b3 wv-bold wv-ibmplexlooped w-full resize-none bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/60"
              />
            </label>
            <div className="mt-2 flex justify-end">
              <span className="wv-b4 wv-ibmplexlooped text-white">
                {customProblemLabel.length}/{PROBLEM_MAX_LENGTH} ตัวอักษร
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <Button
                variant="secondary"
                size="big"
                theme="light"
                leftIcon={null}
                rightIcon={null}
                onClick={handleCancelPropose}
              >
                ยกเลิก
              </Button>
              <Button
                variant="primary"
                size="big"
                theme="light"
                leftIcon={null}
                rightIcon={null}
                onClick={onConfirmCustomProblem}
                disabled={!trimmedCustomProblem}
              >
                เพิ่ม
              </Button>
            </div>
          </div>
        )}
        <p className="wv-b6 text-gray-40 wv-ibmplexlooped">
          &apos;สิ่งที่กำลังจะทำอยู่แล้ว&apos; หมายถึง
          สิ่งที่ถูกเขียนไว้ในแผนพัฒนาท้องถิ่น 5 ปี (พ.ศ. 2566-2570) ฉบับแรก
        </p>
      </div>
    </section>
  );
}
