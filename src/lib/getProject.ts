import {
  Spreadsheet,
  Column,
  Object,
  asString,
  createTransformer,
} from "sheethuahua";
import { Project } from "../services/type";

// Budget cells in the sheet are formatted with thousands separators
// (e.g. "10,200,000"), which `asNumber()` cannot parse directly.
const asFormattedNumber = () =>
  createTransformer<number>(
    (value) => {
      const cleaned = value.replace(/,/g, "").trim();
      if (cleaned === "") return Number.NaN;
      return Number(cleaned);
    },
    (value) => String(value),
  );

const schemaMap = Object({
  project_id: Column("project_id", asString().optional()),
  strategy: Column("strategy", asString().optional()),
  plan: Column("plan", asString().optional()),
  project: Column("project", asString().optional()),
  objective: Column("objective", asString().optional()),
  goal_original: Column("goal_original", asString().optional()),
  budget_66: Column("budget_66", asFormattedNumber().optional()),
  budget_67: Column("budget_67", asFormattedNumber().optional()),
  budget_68: Column("budget_68", asFormattedNumber().optional()),
  budget_69: Column("budget_69", asFormattedNumber().optional()),
  budget_70: Column("budget_70", asFormattedNumber().optional()),
  kpi: Column("kpi", asString().optional()),
  outcome: Column("outcome", asString().optional()),
  organization: Column("organization", asString().optional()),
  goal_ai: Column("goal_ai", asString().optional()),
  category_ai: Column("category_ai", asString().optional()),
});

export async function getProject(): Promise<Project[]> {
  const project = await Spreadsheet(
    "1cg_1klqmRep5yXDrTeUybDrZQl4WgLoH_Wd_eOD3lNk",
  ).get("แผนพัฒนาท้องถิ่น", schemaMap);

  return project.map((item) => ({
    project_id: item.project_id,
    strategy: item.strategy,
    plan: item.plan,
    project: item.project,
    objective: item.objective,
    goal_original: item.goal_original,
    budget_66: item.budget_66,
    budget_67: item.budget_67,
    budget_68: item.budget_68,
    budget_69: item.budget_69,
    budget_70: item.budget_70,
    kpi: item.kpi,
    outcome: item.outcome,
    organization: item.organization,
    goal_ai: item.goal_ai,
    category_ai: item.category_ai,
    type: "exist",
  }));
}
