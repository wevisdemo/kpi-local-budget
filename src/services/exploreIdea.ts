const GOAL_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Goal";
const TRANSACTION_ENDPOINT =
  "https://tornjak.punchup.world/kpi-local/Transaction";
const PROJECT_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Project";
import { ProjectRecord } from "./submitTransaction";
import type { Goal, ProjectNocoDb, Transaction } from "./type";

export async function getGoals(): Promise<Goal[]> {
  const response = await fetch(GOAL_ENDPOINT);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to fetch goals (${response.status}): ${text}`);
  }

  const data = (await response.json()) as Goal[] | { list?: Goal[] } | null;

  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.list)
      ? data.list
      : [];

  return list.filter((goal) => goal.hidden !== true);
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(TRANSACTION_ENDPOINT);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to fetch goals (${response.status}): ${text}`);
  }

  const data = (await response.json()) as
    | Transaction[]
    | { list?: Transaction[] }
    | null;

  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.list)
      ? data.list
      : [];

  return list;
}

export async function getProjects(): Promise<ProjectNocoDb[]> {
  const response = await fetch(PROJECT_ENDPOINT);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to fetch projects (${response.status}): ${text}`);
  }
  const data = (await response.json()) as
    | ProjectNocoDb[]
    | { list?: ProjectNocoDb[] }
    | null;

  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.list)
      ? data.list
      : [];

  return list.filter((project) => project.hidden !== true);
}
export async function addFavGoal(goalId: string | number, vote_count: number) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }
  const response = await fetch(`${GOAL_ENDPOINT}/${goalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": turnstileSiteKey,
    },
    body: JSON.stringify({ vote_count: Number(vote_count) }),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to add fav project (${response.status}): ${text}`);
  }
}

export async function removeFavGoal(
  goalId: string | number,
  vote_count: number,
) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }
  const response = await fetch(`${GOAL_ENDPOINT}/${goalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": turnstileSiteKey,
    },
    body: JSON.stringify({ vote_count: vote_count }),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to add fav project (${response.status}): ${text}`);
  }
}

export async function getProjectsByCategory(
  category: string,
): Promise<ProjectRecord[]> {
  const url = new URL(PROJECT_ENDPOINT);
  url.searchParams.set("where", `(Category,eq,${category})`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to fetch projects (${response.status}): ${text}`);
  }

  const data = (await response.json()) as
    | ProjectRecord[]
    | { list?: ProjectRecord[] }
    | null;

  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.list)
      ? data.list
      : [];

  return list.filter((project) => project.hidden !== true);
}
