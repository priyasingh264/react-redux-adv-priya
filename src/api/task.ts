import { Server, Model } from "miragejs"; // Import MirageJS components
import { Task } from "../types";

// Sample array of tasks
const tasksArray: Task[] = [
  {
    id: "1",
    title: "Task 1",
    assignedTo: "User A",
    status: "in-progress", // Example status
    priority: "high", // Example priority
    startDate: "2023-01-01",
    endDate: "2023-01-02",
  },
  {
    id: "2",
    title: "Task 2",
    assignedTo: "User B",
    status: "done",
    priority: "medium",
    startDate: "2023-01-03",
  },
  // Add more tasks as needed
];

// Set up MirageJS server
export const setupServer = () => {
  new Server({
    models: {
      task: Model,
    },
    seeds(server) {
      tasksArray.forEach(task => server.create("task", task)); // Seed tasks from the array
    },
    routes() {
      this.namespace = "api"; // Set the API namespace

      // Get all tasks
      this.get("/tasks", schema => {
        const tasks = schema.all("task"); // Return all tasks

        return tasks;
      });

      // Create a new task
      this.post("/tasks", (schema, request) => {
        const attrs = JSON.parse(request.requestBody); // Get the new task data
        return schema.tasks.create(attrs); // Create and return the new task
      });

      // Get a task by ID
      this.get("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        const task = schema.tasks.find(id); // Find the task by ID
        return task; // Return the task
      });

      // Edit a task
      this.put("/tasks/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody); // Get the updated task data
        const task = schema.tasks.find(id); // Find the task by ID

        if (task) {
          return task.update(attrs); // Update the task with new attributes
        } else {
          return new Response(404, {}, { error: "Task not found" });
        }
      });

      // Delete a task
      this.delete("/tasks/:id", (schema, request) => {
        const id = request.params.id;

        const foundTask = schema.tasks.find(id); // Find the task by ID

        // console.log("task", foundTask);
        if (foundTask) {
          foundTask.destroy(); // Delete the task

          return new Response(204); // Return no content response
        } else {
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
