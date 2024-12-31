import { createSlice } from "@reduxjs/toolkit";
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

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (args) => {
      console.log(args);
    },
  },
});

export const { createTask } = taskSlice.actions;

export default taskSlice.reducer;
