import { TaskCategory, TaskStatus } from "@/services";

export const TASK_CATEGORY_OPTIONS = [
  { label: "All", value: null },
  { label: "Personal", value: TaskCategory.PERSONAL },
  { label: "Work", value: TaskCategory.WORK },
  { label: "Study", value: TaskCategory.STUDY },
  { label: "Health", value: TaskCategory.HEALTH },
  { label: "Travel", value: TaskCategory.TRAVEL },
  { label: "Finance", value: TaskCategory.FINANCE },
  { label: "Hobbies", value: TaskCategory.HOBBIES },
  { label: "General", value: TaskCategory.GENERAL },
];

export const TASK_STATUS_OPTIONS = [
  { label: "To Do", value: TaskStatus.TO_DO },
  { label: "In Progress", value: TaskStatus.IN_PROGRESS },
  { label: "Done", value: TaskStatus.DONE },
  { label: "Archived", value: TaskStatus.ARCHIVED },
];

export const TASK_STATUS_LABEL = {
  [TaskStatus.IN_PROGRESS]: "In progress",
  [TaskStatus.DONE]: "Done",
  [TaskStatus.ARCHIVED]: "Archived",
  [TaskStatus.TO_DO]: "To do",
};
