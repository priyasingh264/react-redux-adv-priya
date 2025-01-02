import { Button, Space, TableColumnsType, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Task } from "../types";
import { useAppDispatch } from ".";
import { deleteTaskAction, editTaskAction } from "../store/tasks/thunk";
import { useNavigate } from "react-router";

export const useTaskTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleEdit = (task: Task) => {
    dispatch(editTaskAction(task));
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
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      sorter: (a, b) => a.priority.localeCompare(b.priority),
      onCell,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => a.startDate.localeCompare(b.startDate),
      onCell,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      onCell,
    },
    // actions
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
