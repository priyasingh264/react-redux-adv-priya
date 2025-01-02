import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { setupServer } from "./api/task";
import store from "./store";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
import "./index.css";

setupServer();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
