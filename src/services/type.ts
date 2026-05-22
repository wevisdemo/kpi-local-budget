export interface Goal {
  Id?: string | number;
  goal?: string;
  category?: string;
  creator_id?: string;
  timestamp?: string;
  vote_count?: number;
  hidden?: boolean;
  project_count?: number;
}

export interface GoalSheet {
  Id?: string | number;
  goal?: string;
  category?: string;
  all_budget?: number;
  project_count?: number;
}

export interface Plan {
  project_id?: string;
  project?: string;
  detail?: string;
  budget?: number;
  location?: string;
  organization?: string;
  strategy?: string;
  substrategy?: string;
  plan?: string;
  deadline?: string;
}

export interface Project {
  timestamp?: string;
  project_id?: string;
  strategy?: string;
  plan?: string;
  project?: string;
  objective?: string;
  goal_original?: string;
  budget_66?: number;
  budget_67?: number;
  budget_68?: number;
  budget_69?: number;
  budget_70?: number;
  kpi?: string;
  outcome?: string;
  organization?: string;
  goal_ai?: string;
  category_ai?: string;
  type?: string;
  vote_count?: number;
}

export interface Transaction {
  Id?: string | number;
  user_id?: string;
  timestamp?: string;
  goal?: string;
  project?: string;
}

export interface ProjectNocoDb {
  Id?: string;
  project?: string;
  budget?: number;
  goal?: string;
  creator_id?: string;
  timestamp?: string;
  vote_count?: number;
  hidden?: boolean;
}

export interface GoalTransaction {
  Id?: string | number;
  user_id?: string;
  timestamp?: string;
  goal?: {
    Id: string | number;
    goal: string;
  };
}

export interface ProjectTransaction {
  Id?: string | number;
  user_id?: string;
  timestamp?: string;
  Project?: {
    Id: string | number;
    project: string;
  };
}
