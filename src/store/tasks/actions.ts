import { Task } from "../../types";

export const taskActions = {
  FETCH_ALL_TASKS_REQUEST: "FETCH_ALL_TASKS_REQUEST",
  FETCH_ALL_TASKS_SUCCESS: "FETCH_ALL_TASKS_SUCCESS",
  FETCH_ALL_TASKS_FAILURE: "FETCH_ALL_TASKS_SUCCESS",

  FETCH_TASK_BY_ID_REQUEST: "FETCH_TASK_BY_ID_REQUEST",
  FETCH_TASK_BY_ID_SUCCESS: "FETCH_TASK_BY_ID_SUCCESS",
  FETCH_TASK_BY_ID_FAILURE: "FETCH_TASK_BY_ID_FAILURE",

  CREATE_TASK_REQUEST: "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS: "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE: "CREATE_TASK_FAILURE",

  EDIT_TASK_REQUEST: "EDIT_TASK_REQUEST",
  EDIT_TASK_SUCCESS: "EDIT_TASK_SUCCESS",
  EDIT_TASK_FAILURE: "EDIT_TASK_FAILURE",

  DELETE_TASK_REQUEST: "DELETE_TASK_REQUEST",
  DELETE_TASK_SUCCESS: "DELETE_TASK_SUCCESS",
  DELETE_TASK_FAILURE: "DELETE_TASK_FAILURE",
};

interface FetchTasksRequestAction {
  type: typeof taskActions.FETCH_ALL_TASKS_REQUEST;
}

interface FetchTasksSuccessAction {
  type: typeof taskActions.FETCH_ALL_TASKS_SUCCESS;
  payload: {
    tasks: Task[];
  };
}

interface FetchTasksFailureAction {
  type: typeof taskActions.FETCH_ALL_TASKS_FAILURE;
  payload: string;
}

interface FetchTaskByIdRequestAction {
  type: typeof taskActions.FETCH_TASK_BY_ID_REQUEST;
}

interface FetchTaskByIdSuccessAction {
  type: typeof taskActions.FETCH_TASK_BY_ID_SUCCESS;
  payload: Task;
}

interface FetchTaskByIdFailureAction {
  type: typeof taskActions.FETCH_TASK_BY_ID_FAILURE;
  payload: string;
}

interface CreateTaskRequestAction {
  type: typeof taskActions.CREATE_TASK_REQUEST;
}

interface CreateTaskSuccessAction {
  type: typeof taskActions.CREATE_TASK_SUCCESS;
  payload: Task;
}

interface CreateTaskFailureAction {
  type: typeof taskActions.CREATE_TASK_FAILURE;
  payload: string;
}

interface EditTaskRequestAction {
  type: typeof taskActions.EDIT_TASK_REQUEST;
}

interface EditTaskSuccessAction {
  type: typeof taskActions.EDIT_TASK_SUCCESS;
  payload: Task;
}

interface EditTaskFailureAction {
  type: typeof taskActions.EDIT_TASK_FAILURE;
  payload: string;
}

interface DeleteTaskRequestAction {
  type: typeof taskActions.DELETE_TASK_REQUEST;
}

interface DeleteTaskSuccessAction {
  type: typeof taskActions.DELETE_TASK_SUCCESS;
  payload: Task;
}

interface DeleteTaskFailureAction {
  type: typeof taskActions.DELETE_TASK_FAILURE;
  payload: string;
}

export type TaskAction =
  | FetchTasksSuccessAction
  | FetchTasksRequestAction
  | FetchTasksFailureAction
  | FetchTaskByIdRequestAction
  | FetchTaskByIdSuccessAction
  | FetchTaskByIdFailureAction
  | CreateTaskRequestAction
  | CreateTaskSuccessAction
  | CreateTaskFailureAction
  | EditTaskRequestAction
  | EditTaskSuccessAction
  | EditTaskFailureAction
  | DeleteTaskRequestAction
  | DeleteTaskSuccessAction
  | DeleteTaskFailureAction;
