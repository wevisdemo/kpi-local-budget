export type TabId = "understand" | "local" | "action";

export const explorePlanTabs: { id: TabId; label: string }[] = [
  { id: "understand", label: "เข้าใจแผน" },
  { id: "local", label: "แผนพัฒนาท้องถิ่น" },
  { id: "action", label: "แผนดำเนินงาน" },
];

export const colorPlan: { id: number; color: string }[] = [
  { id: 1, color: "#FF1170" },
  { id: 2, color: "#00AEBB" },
  { id: 3, color: "#008F3C" },
  { id: 4, color: "#FF8000" },
  { id: 5, color: "#6D59DF" },
  { id: 6, color: "#0095ff" },
  { id: 7, color: "#EC00E5" },
  { id: 8, color: "#00636A" },
  { id: 9, color: "#E84600" },
  { id: 10, color: "#93008E" },
];
