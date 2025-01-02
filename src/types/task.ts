export type TaskStatus = "open" | "in-progress" | "under-review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  endDate?: string;
}
