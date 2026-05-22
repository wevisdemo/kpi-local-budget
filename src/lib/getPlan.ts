import {
  Spreadsheet,
  Column,
  Object,
  asString,
  createTransformer,
} from "sheethuahua";
import { Plan } from "../services/type";

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
  project: Column("project", asString().optional()),
  detail: Column("detail", asString().optional()),
  budget: Column("budget", asFormattedNumber().optional()),
  location: Column("location", asString().optional()),
  organization: Column("organization", asString().optional()),
  strategy: Column("strategy", asString().optional()),
  substrategy: Column("substrategy", asString().optional()),
  plan: Column("plan", asString().optional()),
  deadline: Column("deadline", asString().optional()),
});

export async function getPlanSheet(): Promise<Plan[]> {
  const plan = await Spreadsheet(
    "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
  ).get("แผนดำเนินงาน", schemaMap);

  return plan.map((item) => ({
    project_id: item.project_id,
    project: item.project,
    detail: item.detail,
    budget: item.budget,
    location: item.location,
    organization: item.organization,
    strategy: item.strategy,
    substrategy: item.substrategy,
    plan: item.plan,
    deadline: item.deadline,
  }));
}
