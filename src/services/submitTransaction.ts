const TRANSACTION_ENDPOINT =
  "https://tornjak.punchup.world/kpi-local/Transaction";
const PROJECT_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Project";
const GOAL_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Goal";
const CATEGORY_ENDPOINT = "https://tornjak.punchup.world/kpi-local/Category";
const BATCH_ENDPOINT = "https://tornjak.punchup.world/batch/kpi-local/";

export interface BatchRequest {
  path: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
}

export interface BatchResponse<T = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: T;
}

export async function submitBatch(
  requests: BatchRequest[],
  token: string,
): Promise<BatchResponse[]> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(BATCH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": token,
      "cf-turnstile-cache-ms": "10000",
    },
    body: JSON.stringify(requests),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to submit batch (${response.status}): ${text}`);
  }

  const results = (await response.json()) as BatchResponse[];

  results.forEach((result, index) => {
    if (result.status >= 400) {
      const request = requests[index];
      const detail =
        typeof result.body === "string"
          ? result.body
          : JSON.stringify(result.body);
      throw new Error(
        `Batch request ${index} (${request.method} ${request.path}) failed (${result.status}): ${detail}`,
      );
    }
  });

  return results;
}

export interface SubmitTransactionPayload {
  user_id: string;
  timestamp: string;
  goal: string;
  project: string;
}

export interface SubmitProjectPayload {
  project: string;
  budget: number;
  goal: string;
  creator_id: string;
  timestamp: string;
  vote_count: number;
  hidden: boolean;
}

export interface SubmitGoalPayload {
  goal: string;
  category: string;
  creator_id: string;
  timestamp: string;
  vote_count: number;
  hidden: boolean;
}

export function formatTransactionTimestamp(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export async function submitTransaction(
  payload: SubmitTransactionPayload,
  token: string,
): Promise<void> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  console.log("token:", token);
  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(TRANSACTION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": token,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Failed to submit transaction (${response.status}): ${text}`,
    );
  }
}

export interface SubmitProjectResponse {
  Id: string | number;
  [key: string]: unknown;
}

export async function submitProject(
  payload: SubmitProjectPayload,
  token: string,
): Promise<SubmitProjectResponse> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(PROJECT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": token,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to submit project (${response.status}): ${text}`);
  }

  return (await response.json()) as SubmitProjectResponse;
}

export interface CategoryRecord {
  Id: string | number;
  category?: string;
  [key: string]: unknown;
}

export async function findCategoryByTitle(
  title: string,
): Promise<CategoryRecord | null> {
  const url = new URL(`${CATEGORY_ENDPOINT}/find-one`);
  url.searchParams.set("where", `(category,eq,${title})`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to find category (${response.status}): ${text}`);
  }

  const data = (await response.json()) as CategoryRecord | null;
  return data && typeof data === "object" && "Id" in data ? data : null;
}

export async function linkProjectToCategory(
  categoryId: string | number,
  projectId: string | number,
  token: string,
): Promise<void> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(
    `${CATEGORY_ENDPOINT}/${categoryId}/hm/project_count/${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cf-turnstile-response": token,
      },
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Failed to link project to category (${response.status}): ${text}`,
    );
  }
}

export async function linkGoalToCategory(
  categoryId: string | number,
  goalId: string | number,
  token: string,
): Promise<void> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(
    `${CATEGORY_ENDPOINT}/${categoryId}/hm/goal_count/${goalId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cf-turnstile-response": token,
      },
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Failed to link goal to category (${response.status}): ${text}`,
    );
  }
}

export interface SubmitGoalResponse {
  Id: string | number;
  [key: string]: unknown;
}

export async function submitGoal(
  payload: SubmitGoalPayload,
  token: string,
): Promise<SubmitGoalResponse> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(GOAL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": token,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to submit goal (${response.status}): ${text}`);
  }

  return (await response.json()) as SubmitGoalResponse;
}

export interface GoalRecord {
  Id?: string | number;
  goal?: string;
  category?: string;
  creator_id?: string;
  timestamp?: string;
  vote_count?: number;
  hidden?: boolean;
  [key: string]: unknown;
}

export async function getGoalsByCategory(
  categoryTitle: string,
): Promise<GoalRecord[]> {
  const url = new URL(GOAL_ENDPOINT);
  url.searchParams.set("where", `(category,eq,${categoryTitle})`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to fetch goals (${response.status}): ${text}`);
  }

  const data = (await response.json()) as
    | GoalRecord[]
    | { list?: GoalRecord[] }
    | null;

  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.list)
      ? data.list
      : [];

  return list.filter((goal) => goal.hidden !== true);
}

export interface ProjectRecord {
  Id?: string | number;
  project?: string;
  budget?: number;
  goal?: string;
  creator_id?: string;
  timestamp?: string;
  vote_count?: number;
  hidden?: boolean;
  [key: string]: unknown;
}

export async function getProjectsByGoal(
  goal: string,
): Promise<ProjectRecord[]> {
  const url = new URL(PROJECT_ENDPOINT);
  url.searchParams.set("where", `(goal,eq,${goal})`);

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

export async function linkProjectToGoal(
  goalId: string | number,
  projectId: string | number,
  token: string,
): Promise<void> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }

  const response = await fetch(
    `${GOAL_ENDPOINT}/${goalId}/hm/project_count/${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cf-turnstile-response": token,
      },
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Failed to link project to goal (${response.status}): ${text}`,
    );
  }
}

export async function addFavProject(
  projectId: string | number,
  vote_count: number,
): Promise<void> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }
  const response = await fetch(`${PROJECT_ENDPOINT}/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": turnstileSiteKey,
    },
    body: JSON.stringify({ vote_count: Number(vote_count) + 1 }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to add fav project (${response.status}): ${text}`);
  }
}

export async function removeFavProject(
  projectId: string | number,
  vote_count: number,
): Promise<void> {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!turnstileSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  }
  const response = await fetch(`${PROJECT_ENDPOINT}/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "cf-turnstile-response": turnstileSiteKey,
    },
    body: JSON.stringify({ vote_count: vote_count }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Failed to remove fav project (${response.status}): ${text}`,
    );
  }
}
