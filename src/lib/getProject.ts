import {
  Spreadsheet,
  Column,
  Object,
  asString,
  createTransformer,
} from "sheethuahua";
import { Project } from "../services/type";
import { currentSite } from "../config/sites";

// Budget cells may contain thousands separators ("10,200,000"), trailing
// Thai annotations ("5000000 (เงินอุดหนุนเฉพาะกิจ)"), or pure text
// ("กฎหมาย"). Extract first numeric run; cells without digits become
// undefined so display sites can render an empty value.
const asFormattedNumber = () =>
  createTransformer<number | undefined>(
    (value) => {
      const match = value.match(/[\d,]+(?:\.\d+)?/);
      if (!match) return undefined;
      const cleaned = match[0].replace(/,/g, "");
      if (cleaned === "") return undefined;
      const parsed = Number(cleaned);
      return Number.isFinite(parsed) ? parsed : undefined;
    },
    (value) => (value === undefined ? "" : String(value)),
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
  const project = await Spreadsheet(currentSite.sheetId_1y).get(
    currentSite.sheetName_1y,
    schemaMap,
  );

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
