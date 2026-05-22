export type TabId = "understand" | "local" | "action";

export const explorePlanTabs: { id: TabId; label: string; href: string }[] = [
  {
    id: "understand",
    label: "เข้าใจแผน",
    href: "/explore-plan?tab=understand",
  },
  { id: "local", label: "แผนพัฒนาท้องถิ่น", href: "/explore-plan?tab=local" },
  { id: "action", label: "แผนดำเนินงาน", href: "/explore-plan?tab=action" },
];
