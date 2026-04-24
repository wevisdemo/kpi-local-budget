"use client";

import { ideaCategories } from "../data";
import { useCreateIdea } from "../hooks/useCreateIdea";
import Button from "@/src/components/Button";
import CategoryStep from "./CategoryStep";
import IdeaDetailStep from "./IdeaDetailStep";
import ProblemStep from "./ProblemStep";
import ReviewStep from "./ReviewStep";
import StepIndicator from "./StepIndicator";
import SuccessStep from "./SuccessStep";
import { currentSite } from "@/src/config/sites";

export default function CreateIdeaContent() {
  const {
    step,
    selectedCategoryId,
    selectedCategory,
    selectedProblemId,
    ideaTitle,
    ideaBudget,
    availableProblems,
    isProposingNewProblem,
    effectiveProblemLabel,
    effectiveProblemLabelId,
    matchedProjects,
    supportCount,
    isStepValid,
    isSubmitting,
    submitError,
    turnstileRef,
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
  } = useCreateIdea();

  return (
    <div className="w-full bg-yellow-10">
      <div className="max-w-[1040px] mx-auto py-20 px-5 lg:px-0">
        {step < 5 && (
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <h1 className="wv-h5 wv-ibmplexlooped wv-bold text-black text-center">
                คุณอยากเห็น{currentSite.subtext} พัฒนาในเรื่องไหน ?
              </h1>
              <p className="wv-b4 wv-ibmplexlooped text-gray-40 text-center">
                ทุกไอเดียที่คุณ &apos;ปั้น&apos; จะถูกรวบรวมและพัฒนาโดยทีมงาน
                เพื่อเปลี่ยนเป็นนโยบายสาธารณะที่ใช้งานได้จริงในชุมชนเรา
              </p>
            </div>

            <div className="flex justify-center">
              <StepIndicator step={step} />
            </div>
            {step === 1 && (
              <div className="mt-5 flex flex-col items-center justify-center gap-[5px]">
                <h1 className="wv-h6 wv-ibmplexlooped text-black">
                  เลือกประเด็นที่คุณต้องการให้ความเห็น
                </h1>
                <p className="wv-b5 wv-ibmplexlooped text-gray-30">
                  เลือกได้ 1 ข้อ
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="mt-5 flex flex-col items-center justify-center gap-[5px]">
                <h1 className="wv-h6 wv-ibmplexlooped text-black text-center">
                  คุณอยากเห็นเป้าหมายไหนในประเด็นนี้สำเร็จมากที่สุด
                </h1>
                <p className="wv-b5 wv-ibmplexlooped text-gray-30">
                  เลือกได้ 1 ข้อ
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="mt-5 flex flex-col items-center justify-center gap-[5px]">
                <h1 className="wv-h6 wv-ibmplexlooped text-black text-center">
                  คุณคิดว่าเทศบาลควรทำโครงการอะไรเพื่อให้ไปถึงเป้าหมายนี้?
                </h1>
                <p className="wv-b5 wv-ibmplexlooped text-gray-30">ข้ามได้</p>
              </div>
            )}
            {step === 4 && (
              <div className="mt-5 flex flex-col items-center justify-center gap-[5px]">
                <h1 className="wv-h6 wv-ibmplexlooped text-black">
                  ไอเดียของคุณ
                </h1>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 ">
          {step === 1 && (
            <CategoryStep
              categories={ideaCategories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={handleSelectCategory}
            />
          )}

          {step === 2 && (
            <ProblemStep
              categoryId={selectedCategoryId ?? "-"}
              categoryTitle={selectedCategory?.title ?? ""}
              problems={availableProblems}
              selectedProblemId={selectedProblemId}
              onSelectProblem={setSelectedProblemId}
            />
          )}

          {step === 3 && (
            <IdeaDetailStep
              problemLabel={effectiveProblemLabel}
              title={ideaTitle}
              budget={ideaBudget}
              onChangeTitle={setIdeaTitle}
              onChangeBudget={setIdeaBudget}
              matchedProjects={matchedProjects}
              isProposingProblem={isProposingNewProblem}
              onChangeProblemLabel={setCustomProblemLabel}
            />
          )}

          {step === 4 && (
            <ReviewStep
              categoryId={selectedCategory?.id ?? ""}
              categoryTitle={selectedCategory?.title ?? "-"}
              problemLabel={effectiveProblemLabel || "-"}
              proposeCount={ideaTitle ? 1 : 0}
              supportCount={supportCount}
              onTurnstileVerify={setTurnstileToken}
              turnstileRef={turnstileRef}
            />
          )}

          {step === 5 && <SuccessStep onReset={resetFlow} />}
        </div>

        {step < 5 && (
          <div className="mt-3.5 w-full grid grid-cols-2 gap-[5px]">
            <div className="col-span-1">
              {step !== 1 && (
                <Button
                  variant="secondary"
                  size="big"
                  theme="dark"
                  rightIcon={null}
                  onClick={goBack}
                  className="w-full"
                >
                  ย้อนกลับ
                </Button>
              )}
            </div>
            <div className="col-span-1">
              {step < 4 ? (
                <Button
                  variant="primary"
                  size="big"
                  theme="dark"
                  leftIcon={null}
                  onClick={goNext}
                  disabled={!isStepValid}
                  className="w-full"
                >
                  ถัดไป
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="big"
                  theme="dark"
                  leftIcon={null}
                  rightIcon={null}
                  onClick={handleSubmitIdea}
                  disabled={!isStepValid || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "กำลังส่ง..." : "ยืนยันและส่งไอเดีย"}
                </Button>
              )}
            </div>
            {step === 4 && submitError && (
              <p className="wv-b6 wv-ibmplexlooped col-span-2 text-red-500">
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
