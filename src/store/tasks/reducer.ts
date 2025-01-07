import { Task } from "../../types";
import { TaskAction, taskActions } from "./actions";

interface TaskInitialState {
  data: Task[];
  isLoading: boolean;
  hasError: boolean;
  isTaskCreating: boolean;
  isTaskEditing: boolean;
  isTaskDeleting: boolean;
  isTaskDetailLoading: boolean;
  taskDetail: Task | null;
}

const initialState: TaskInitialState = {
  data: [],
  isLoading: false,
  hasError: false,
  isTaskCreating: false,
  isTaskEditing: false,
  isTaskDeleting: false,
  isTaskDetailLoading: false,
  taskDetail: null,
};

export default function taskReducer(state = initialState, action: TaskAction) {
  console.log(action);

  switch (action.type) {
    case taskActions.CREATE_TASK_REQUEST:
      return {
        ...state,
        isTaskCreating: true,
      };

    case taskActions.CREATE_TASK_SUCCESS:
      console.log(action);
      return {
        ...state,
        isTaskCreating: false,
        // @ts-ignore
        taskDetail: action.payload,
      };

    case taskActions.EDIT_TASK_REQUEST:
      return {
        ...state,
        isTaskEditing: true,
      };

    case taskActions.EDIT_TASK_SUCCESS:
      return {
        ...state,
        isTaskEditing: false,
      };

    case taskActions.DELETE_TASK_REQUEST:
      return {
        ...state,
        isTaskDeleting: true,
      };

    case taskActions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isTaskDeleting: false,
      };

    case taskActions.FETCH_ALL_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case taskActions.FETCH_ALL_TASKS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        // @ts-ignore
        data: action.payload.tasks,
      };
    }

    case taskActions.FETCH_ALL_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case taskActions.FETCH_TASK_BY_ID_REQUEST:
      return {
        ...state,
        isTaskDetailLoading: true,
      };

    case taskActions.FETCH_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        isTaskDetailLoading: false,
        // @ts-ignore
        taskDetail: action.payload.task,
      };

    default:
      return state;
  }
}
