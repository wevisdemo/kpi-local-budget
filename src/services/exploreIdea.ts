const GOAL_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Goal";
const GOAL_ENDPOINT_SORT =
  "https://tornjak.punchup.world/kpi-local/Goal?sort=-vote_count";
// const TRANSACTION_ENDPOINT =
//   "https://tornjak.punchup.world/kpi-local/Transaction";
const PROJECT_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Project";
const GOAL_TRANSACTION_ENDPOINT =
  "https://tornjak.punchup.world/kpi-local/Goal_Like";
import { ProjectRecord } from "./submitTransaction";
import type { Goal, GoalTransaction, ProjectNocoDb, Transaction } from "./type";

export async function getGoals(): Promise<Goal[]> {
  const response = await fetch(GOAL_ENDPOINT_SORT);

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

// export async function getTransactions(): Promise<Transaction[]> {
//   const response = await fetch(TRANSACTION_ENDPOINT);

//   if (!response.ok) {
//     const text = await response.text().catch(() => "");
//     throw new Error(`Failed to fetch goals (${response.status}): ${text}`);
//   }

//   const data = (await response.json()) as
//     | Transaction[]
//     | { list?: Transaction[] }
//     | null;

//   const list = Array.isArray(data)
//     ? data
//     : data && Array.isArray(data.list)
//       ? data.list
//       : [];

//   return list;
// }

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
export async function addFavGoal(
  token: string,
  user_id: string,
  timestamp: string,
): Promise<GoalTransaction | null> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }
  const response = await fetch(`${GOAL_TRANSACTION_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": token,
      "cf-turnstile-cache-ms": "10000",
    },
    body: JSON.stringify({ user_id: user_id, timestamp: timestamp }),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to add fav project (${response.status}): ${text}`);
  }

  const data = (await response
    .json()
    .catch(() => null)) as GoalTransaction | null;

  return data;
}

export async function removeFavGoal(token: string, goalId: string | number) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }
  const response = await fetch(`${GOAL_TRANSACTION_ENDPOINT}/${goalId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": token,
      "cf-turnstile-cache-ms": "10000",
    },
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
