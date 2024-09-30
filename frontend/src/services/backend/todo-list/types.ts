export enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
}

export enum TaskCategory {
  PERSONAL = "PERSONAL",
  WORK = "WORK",
  STUDY = "STUDY",
  HEALTH = "HEALTH",
  TRAVEL = "TRAVEL",
  FINANCE = "FINANCE",
  HOBBIES = "HOBBIES",
  GENERAL = "GENERAL",
}

export interface TaskFiltersForm {
  category: TaskCategory | null;
  archived: boolean;
}

export interface TaskCreateDto {
  title: string;
  subtitle: string;
  description?: string;
  status: TaskStatus;
  archived?: boolean;
  category: TaskCategory;
}

export interface TaskUpdateDto {
  title?: string;
  subtitle?: string;
  description?: string;
  status?: TaskStatus;
  archived?: boolean;
  category?: TaskCategory;
}

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: TaskStatus;
  archived?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
