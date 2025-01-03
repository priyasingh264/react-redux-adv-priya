import { NavLink, useParams } from "react-router";
import { Button, Col, Row, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { getTaskByIdAction } from "../store/tasks/thunk";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Header } from "../components";
import { TASK_PRIORITY, TASK_STATUS } from "../utils/constants";
import { TaskPriority } from "../types";
import { TaskStatus } from "../types";

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { taskDetail, isTaskDetailLoading } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    if (id) {
      dispatch(getTaskByIdAction(id));
    }
  }, [id, dispatch]);

  if (isTaskDetailLoading && !taskDetail) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Spin size="large" />;
      </Row>
    );
  }

  return (
    <div>
      <Header>
        <Row align="middle" justify="start">
          <NavLink to="/">
            <Button type="link" icon={<ArrowLeftOutlined size={20} />}></Button>
          </NavLink>
          <h2>{taskDetail?.title}</h2>
        </Row>
      </Header>
      <Row gutter={16} style={{ padding: "0 24px" }}>
        <Col span={12}>
          <h3>Assigned To</h3>
          <p>{taskDetail?.assignedTo}</p>
        </Col>
        <Col span={12}>
          <h3>Status</h3>
          <p>{TASK_STATUS[taskDetail?.status as TaskStatus]}</p>
        </Col>
        <Col span={12}>
          <h3>Priority</h3>
          <p>{TASK_PRIORITY[taskDetail?.priority as TaskPriority]}</p>
        </Col>
        <Col span={12}>
          <h3>Start Date</h3>
          <p>{taskDetail?.startDate}</p>
        </Col>
        <Col span={12}>
          <h3>End Date</h3>
          <p>{taskDetail?.endDate ?? "NA"}</p>
        </Col>
      </Row>
    </div>
  );
}
