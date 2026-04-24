import { Turnstile } from "@marsidev/react-turnstile";

const CATEGORY_BORDER_COLORS: Record<string, string> = {
  education: "#ff8000",
  health: "#00aebb",
  infrastructure: "#bd6e00",
  environment: "#008f3c",
  safety: "#00636a",
  welfare: "#93008e",
  culture: "#ec00e5",
  governance: "#6d59df",
  economy: "#e84600",
  job: "#0095ff",
  tourism: "#ff1170",
};

interface ReviewStepProps {
  categoryId: string;
  categoryTitle: string;
  problemLabel: string;
  proposeCount?: number;
  supportCount?: number;
  onTurnstileVerify: (token: string) => void;
}

export default function ReviewStep({
  categoryId,
  categoryTitle,
  problemLabel,
  proposeCount = 0,
  supportCount = 0,
  onTurnstileVerify,
}: ReviewStepProps) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // console.log("turnstileSiteKey:", turnstileSiteKey);
  return (
    <div className="flex flex-col gap-3">
      <section
        className="overflow-hidden rounded-[10px] border-2"
        style={{ borderColor: CATEGORY_BORDER_COLORS[categoryId] }}
      >
        <header
          className={`maincategory__${categoryId} p-4 text-white `}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "color-burn",
            backgroundImage: `url(${basePath}/img/${categoryId}.png)`,
          }}
        >
          <p className="wv-b5 wv-bold wv-ibmplexlooped">{categoryTitle}</p>
        </header>
        <div className="flex items-start justify-between gap-5 bg-white px-5 py-4">
          <div className="flex-1">
            <p className="wv-b6 wv-bold wv-ibmplexlooped text-black">
              เป้าหมาย
            </p>
            <p className="wv-b5 wv-ibmplexlooped mt-0.5 text-black">
              {problemLabel}
            </p>
          </div>
          <div className="flex shrink-0 gap-6">
            <div>
              <p className="wv-b6 wv-bold wv-ibmplexlooped text-black">เสนอ</p>
              <p className="wv-b5 wv-ibmplexlooped mt-0.5 text-black">
                {proposeCount} โครงการ
              </p>
            </div>
            <div>
              <p className="wv-b6 wv-bold wv-ibmplexlooped text-black">
                สนับสนุน
              </p>
              <p className="wv-b5 wv-ibmplexlooped mt-0.5 text-black">
                {supportCount} โครงการ
              </p>
            </div>
          </div>
        </div>
      </section>
      <Turnstile
        siteKey={turnstileSiteKey ?? ""}
        onSuccess={onTurnstileVerify}
        // options={{
        //   // execution: "execute",
        //   appearance: "always",
        //   retry: "never", // ไม่ retry PAT
        // }}
      />
    </div>
  );
}
