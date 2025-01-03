import { Button, Space, TableColumnsType, Modal, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Task, TaskPriority, TaskStatus } from "../types";
import { useAppDispatch } from ".";
import { deleteTaskAction } from "../store/tasks/thunk";
import { useNavigate } from "react-router";
import { TASK_PRIORITY, TASK_STATUS } from "../utils/constants";

export const useTaskTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleEdit = (task: Task) => {
    navigate(`/task/${task.id}/edit`);
  };

  const handleDelete = (task: Task) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      onOk: () => {
        dispatch(deleteTaskAction(task));
      },
    });
  };

  const onCell = (record: Task) => {
    return {
      onClick: () => {
        navigate(`/task/${record.id}`);
        console.log(record);
      },
    };
  };

  const columns: TableColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      onCell,
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      sorter: (a, b) => a.assignedTo.localeCompare(b.assignedTo),
      onCell,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      onCell,
      render: (text: TaskStatus) => {
        return (
          <Tag
            color={
              text === "DONE"
                ? "green"
                : text === "OPEN"
                ? "blue"
                : text === "IN_PROGRESS"
                ? "orange"
                : "red"
            }
          >
            {TASK_STATUS[text]}
          </Tag>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      sorter: (a, b) => a.priority.localeCompare(b.priority),
      onCell,
      render: (text: TaskPriority) => {
        return (
          <Tag
            color={
              text === "HIGH" ? "red" : text === "MEDIUM" ? "orange" : "green"
            }
          >
            {TASK_PRIORITY[text]}
          </Tag>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => a.startDate.localeCompare(b.startDate),
      onCell,
      render: (text: string) => {
        return dayjs(text).format("DDMMMYYYY");
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      onCell,
      render: (text: string) => {
        return text ? dayjs(text).format("DDMMMYYYY") : "-";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, task: Task) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => handleEdit(task)}
            ></Button>
            <Button
              icon={<DeleteOutlined />}
              type="link"
              onClick={() => handleDelete(task)}
              danger
            ></Button>
          </Space>
        );
      },
    },
  ];

  return { columns };
};
