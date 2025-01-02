import { Dispatch } from "redux";
import { Task } from "../../types";
import {
  createTask,
  deleteTask,
  editTask,
  fetchTaskById,
  fetchTasks,
} from "../../api";

import { TaskAction, taskActions } from "./actions";

// fetch task using thunk action creator
export const getTasksAction = () => async (dispatch: Dispatch<TaskAction>) => {
  dispatch({ type: taskActions.FETCH_ALL_TASKS_REQUEST });

  try {
    const tasks = await fetchTasks();
    dispatch({ type: taskActions.FETCH_ALL_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    dispatch({ type: taskActions.FETCH_ALL_TASKS_FAILURE, payload: error });
  }
};

export const createTaskAction =
  (task: Task) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: taskActions.CREATE_TASK_REQUEST });
    await createTask(task);
    dispatch({ type: taskActions.CREATE_TASK_SUCCESS, payload: task });
    dispatch(getTasksAction()); // Fetch updated tasks after creation
  };

export const editTaskAction =
  (task: Task) => async (dispatch: Dispatch<TaskAction>) => {
    // Dispatch the edit task action
    dispatch({ type: taskActions.EDIT_TASK_REQUEST });
    await editTask(task);

    dispatch({ type: taskActions.EDIT_TASK_SUCCESS, payload: task });
    dispatch(getTasksAction()); // Fetch updated tasks after editing
  };

export const deleteTaskAction =
  (task: Task) => async (dispatch: Dispatch<TaskAction>) => {
    // Dispatch the delete task action
    dispatch({ type: taskActions.DELETE_TASK_REQUEST });
    await deleteTask(task);

    dispatch({ type: taskActions.DELETE_TASK_SUCCESS, payload: task });
    dispatch(getTasksAction()); // Fetch updated tasks after deletion
  };

export const getTaskByIdAction =
  (id: string) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: taskActions.FETCH_TASK_BY_ID_REQUEST });
    const task = await fetchTaskById(id);
    dispatch({ type: taskActions.FETCH_TASK_BY_ID_SUCCESS, payload: task });
  };
