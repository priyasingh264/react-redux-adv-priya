// import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface TaskInitialState {
  data: Task[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: TaskInitialState = {
  data: [],
  isLoading: false,
  hasError: false,
};

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     createTask: (args) => {
//       console.log(args);
//     },
//   },
// });

// export const { createTask } = taskSlice.actions;

// export default taskSlice.reducer;

export default function taskReducer(state = initialState, action){

 switch(action.type) {
  case "task/edit": 
    console.log("edit task")
    return {
      ...state
    }

  case "task/delete": 
    console.log("delete task")
    return {
      ...state
    }

  case "tasks/loading":
    return {
      ...state,
      isLoading: true
    }
  
  case "tasks/loaded":
    return {
      ...state,
      isLoading: false,
      data: action.payload
    }

  default:
    return state;
 }
}
