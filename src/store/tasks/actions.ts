export const taskActions = {
    FETCH_TASKS_REQUEST: "FETCH_TASKS_REQUEST",
    FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS",
    FETCH_TASKS_FAILURE: "FETCH_TASKS_SUCCESS",
    EDIT_TASK: "EDIT_TASK",
    DELETE_TASK: "DELETE_TASK",
}

interface FetchTasksRequestAction {
    type: typeof taskActions.FETCH_TASKS_REQUEST
}

interface FetchTasksSuccessAction {
    type: typeof taskActions.FETCH_TASKS_SUCCESS
}

interface FetchTasksFailureAction {
    type: typeof taskActions.FETCH_TASKS_SUCCESS
}