import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { setupServer } from "./api/task";
import store from "./store";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
import TaskEdit from "./pages/TaskEdit";
import "./index.css";

setupServer();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/task/:id/edit" element={<TaskEdit />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
