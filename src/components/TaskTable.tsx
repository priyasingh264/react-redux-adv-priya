import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getTasksAction } from "../store/tasks/thunk";
import { useAppDispatch } from "../hooks";
import { useTaskTable } from "../hooks/useTaskTable";

const TaskTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksAction());
  }, [dispatch]);

  const { columns } = useTaskTable();

  const { data, isLoading } = useSelector((state: RootState) => state.task);

  return (
    <Table
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
      loading={isLoading}
      rowClassName={"cursor-pointer"}
      pagination={{
        hideOnSinglePage: true,
      }}
    />
  );
};

export default TaskTable;
