import type { CreateIdeaStep } from "../types";

interface StepIndicatorProps {
  step: CreateIdeaStep;
}

const labels: Record<CreateIdeaStep, string> = {
  1: "ประเด็น",
  2: "เป้าหมาย",
  3: "โครงการ",
  4: "สรุป",
  5: "สรุป",
};

const steps: CreateIdeaStep[] = [1, 2, 3, 4];

export default function StepIndicator({ step }: StepIndicatorProps) {
  const activeStep = step > 4 ? 4 : step;

  return (
    <div className="w-full px-4 max-w-[600px]">
      <div className="flex items-start">
        {steps.map((item, index) => {
          const isCompleted = item < activeStep;
          const isActive = item === activeStep;
          const isUpcoming = item > activeStep;

          return (
            <div
              key={item}
              className={`flex items-start ${
                index < steps.length - 1 ? "flex-1" : "flex-none"
              }`}
            >
              <div className="relative flex w-[25px] shrink-0 flex-col items-center">
                <span
                  className={`flex h-[25px] w-[25px] items-center justify-center rounded-full border-2 wv-b6 leading-none wv-ibmplexlooped wv-bold ${
                    isActive
                      ? "border-gray-40 bg-gray-40 text-white"
                      : isCompleted
                        ? "border-[#A9ABA6] bg-[#A9ABA6] text-white"
                        : "border-[#C7C8C3] bg-transparent text-[#C7C8C3]"
                  }`}
                >
                  {item}
                </span>
                <p
                  className={`absolute top-[30px] left-1/2 -translate-x-1/2 whitespace-nowrap wv-b6 leading-none wv-ibmplexlooped ${
                    isUpcoming ? "text-[#C7C8C3]" : "text-[#4D4F4B]"
                  }`}
                >
                  {labels[item]}
                </p>
              </div>

              {index < steps.length - 1 && (
                <span className=" mt-3 h-0.5 flex-1 bg-gray-20" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
