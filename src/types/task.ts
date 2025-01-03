export enum TaskStatusEnum {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  UNDER_REVIEW = "UNDER_REVIEW",
  DONE = "DONE",
}

export enum TaskPriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type TaskStatus = `${TaskStatusEnum}`;
export type TaskPriority = `${TaskPriorityEnum}`;

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  endDate?: string;
}
