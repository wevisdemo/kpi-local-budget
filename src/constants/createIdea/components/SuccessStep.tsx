import Button from "@/src/components/Button";

interface SuccessStepProps {
  onReset: () => void;
}

export default function SuccessStep({ onReset }: SuccessStepProps) {
  return (
    <section className="md:max-w-[500px] mx-auto max-w-[250px] h-full pt-20 pb-20 wv-ibmplexlooped flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2.5">
        <p className="wv-h5 wv-bold text-black">ขอบคุณสำหรับไอเดีย!</p>
        <p className="wv-b4 text-gray-40">ความคิดเห็นของคุณถูกบันทึกแล้ว</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2.5 w-full">
        <Button
          variant="primary"
          size="big"
          theme="dark"
          leftIcon={null}
          className="w-full"
        >
          สำรวจไอเดีย
        </Button>
        <Button
          variant="secondary"
          size="big"
          theme="dark"
          leftIcon={null}
          className="w-full"
        >
          สำรวจแผน
        </Button>
        <button
          type="button"
          onClick={onReset}
          className="wv-b4 wv-bold wv-ibmplexlooped text-gray-50 underline"
        >
          ปั้นไอเดียเพิ่มเติม
        </button>
      </div>
    </section>
  );
}
