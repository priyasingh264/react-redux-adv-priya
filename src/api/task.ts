import { Server, Model } from "miragejs"; // Import MirageJS components
import { Task } from "../types";

const tasksArray: Task[] = [
  {
    title: "Task 1",
    assignedTo: "task1@gmail.com",
    status: "OPEN",
    priority: "LOW",
    startDate: "25Dec2024",
    id: "5b922c63-7195-4d97-a294-f9c8c92fc601",
  },
  {
    title: "Task 2",
    assignedTo: "task2@gmail.com",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    startDate: "26Dec2024",
    id: "5b922c63-7195-4d97-a294-f9c8c92fc602",
  },
  {
    title: "Task 3",
    assignedTo: "task3@gmail.com",
    status: "DONE",
    priority: "HIGH",
    startDate: "27Dec2024",
    id: "5b922c63-7195-4d97-a294-f9c8c92fc603",
  },
  {
    title: "Task 4",
    assignedTo: "task4@gmail.com",
    status: "UNDER_REVIEW",
    priority: "HIGH",
    startDate: "28Dec2024",
    id: "5b922c63-7195-4d97-a294-f9c8c92fc604",
  },
  {
    title: "Task 5",
    assignedTo: "task5@gmail.com",
    status: "OPEN",
    priority: "LOW",
    startDate: "29Dec2024",
    id: "5b922c63-7195-4d97-a294-f9c8c92fc605",
  },
  {
    title: "Task 6",
    assignedTo: "task6@gmail.com",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    startDate: "30Dec2024",
    id: "5b922c63-7195-4d97-a294-f9c8c92fc606",
  },
];

// Set up MirageJS server
export const setupServer = () => {
  new Server({
    models: {
      task: Model,
    },
    seeds(server) {
      tasksArray.forEach((task) => server.create("task", task)); // Seed tasks from the array
    },
    routes() {
      this.namespace = "api"; // Set the API namespace

      // Get all tasks
      this.get("/tasks", (schema) => {
        const tasks = schema.all("task"); // Return all tasks

        return tasks;
      });

      // Create a new task
      this.post("/tasks", (schema, request) => {
        const attrs = JSON.parse(request.requestBody); // Get the new task data
        // @ts-ignore
        return schema.tasks.create(attrs); // Create and return the new task
      });

      // Get a task by ID
      this.get("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        // @ts-ignore
        const task = schema.tasks.find(id); // Find the task by ID
        return task; // Return the task
      });

      // Edit a task
      this.put("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody); // Get the updated task data
        // @ts-ignore
        const task = schema.tasks.find(id); // Find the task by ID

        if (task) {
          return task.update(attrs); // Update the task with new attributes
        } else {
          // @ts-ignore
          return new Response(404, {}, { error: "Task not found" });
        }
      });

      // Delete a task
      this.delete("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        // @ts-ignore
        const foundTask = schema.tasks.find(id); // Find the task by ID

        // console.log("task", foundTask);
        if (foundTask) {
          foundTask.destroy(); // Delete the task
          // @ts-ignore
          return new Response(204); // Return no content response
        } else {
          // @ts-ignore
          return new Response(404, {}, { error: "Task not found" });
        }
      });
    },
  });
};

// Fetch tasks from MirageJS endpoint
export const fetchTasks = async () => {
  const response = await fetch("/api/tasks"); // Fetch from MirageJS endpoint
  return response.json(); // Return the JSON response
};

export const fetchTaskById = async (id: string) => {
  const response = await fetch(`/api/tasks/${id}`);
  return response.json();
};

// Edit a task
export const editTask = async (task: Task) => {
  const response = await fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
  return response.json();
};

// Delete a task
export const deleteTask = async (task: Task) => {
  const response = await fetch(`/api/tasks/${task.id}`, {
    method: "DELETE",
  });
  return response.json();
};

// Create a new task
export const createTask = async (task: Task) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return response.json();
};
