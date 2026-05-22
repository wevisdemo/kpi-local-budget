export interface IdeaCategory {
  id: string;
  title: string;
  color: string;
}

export const CATEGORY_BORDER_COLORS: Record<string, string> = {
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

export const projectCategories: IdeaCategory[] = [
  {
    id: "education",
    title: "การศึกษาและเรียนรู้ตลอดชีวิต",
    color: "#ff8000",
  },
  {
    id: "health",
    title: "สาธารณสุขและสุขภาวะ",
    color: "#00aebb",
  },
  {
    id: "environment",
    title: "สิ่งแวดล้อมและพลังงาน",
    color: "#008f3c",
  },
  {
    id: "safety",
    title: "ความมั่นคงและความปลอดภัย",
    color: "#00636a",
  },
  {
    id: "governance",
    title: "การบริหารจัดการและธรรมาภิบาล",
    color: "#6d59df",
  },
  {
    id: "job",
    title: "โอกาสทางอาชีพและการจ้างงานที่เป็นธรรม",
    color: "#0095ff",
  },
  {
    id: "welfare",
    title: "สวัสดิการและสังคมสงเคราะห์",
    color: "#93008e",
  },
  {
    id: "infrastructure",
    title: "โครงสร้างพื้นฐานและการเดินทาง",
    color: "#bd6e00",
  },
  {
    id: "culture",
    title: "ศิลปะ วัฒนธรรม และนันทนาการ",
    color: "#ec00e5",
  },
  {
    id: "tourism",
    title: "การท่องเที่ยวและเศรษฐกิจสร้างสรรค์",
    color: "#ff1170",
  },
  {
    id: "economy",
    title: "เศรษฐกิจฐานรากและสวัสดิภาพครัวเรือน",
    color: "#e84600",
  },
];
