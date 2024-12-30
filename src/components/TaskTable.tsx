import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Task } from "../types";

const columns: TableColumnsType<Task> = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Assigned To",
    dataIndex: "assignedTo",
    sorter: (a, b) => a.assignedTo.localeCompare(b.assignedTo),
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const taskData: Task[] = [
  {
    id: "task1",
    title: "Task 1",
    assignedTo: "task@gmail.com",
    status: "Open",
    priority: "Low",
    startDate: "12/12/2024",
  },
  {
    id: "task2",
    title: "Task 2",
    assignedTo: "task2@gmail.com",
    status: "In-Progress",
    priority: "Low",
    startDate: "14/12/2024",
  },
];

const onChange: TableProps<Task>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TaskTable: React.FC = () => (
  <Table
    columns={columns}
    dataSource={taskData}
    onChange={onChange}
    showSorterTooltip={{ target: "sorter-icon" }}
  />
);

export default TaskTable;
