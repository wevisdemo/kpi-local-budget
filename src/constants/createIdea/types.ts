export type CreateIdeaStep = 1 | 2 | 3 | 4 | 5;

export interface IdeaCategory {
  id: string;
  title: string;
  description: string;
}

export const PROPOSE_NEW_PROBLEM = "__propose_new__";
