import { NavLink, useParams } from "react-router";
import { Button, Col, Row, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { getTaskByIdAction } from "../store/tasks/thunk";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function TaskDetail() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { taskDetail, isTaskDetailLoading } = useSelector(
    (state: RootState) => state.task
  );

  console.log(taskDetail, isTaskDetailLoading);

  useEffect(() => {
    dispatch(getTaskByIdAction(params.id));
  }, [params.id, dispatch]);

  if (isTaskDetailLoading && !taskDetail) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Spin size="large" />;
      </Row>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row align="middle">
        {/* <Col span={24}> */}
        <NavLink to="/">
          <Button type="link" icon={<ArrowLeftOutlined size={20} />}></Button>
        </NavLink>
        <h2>{taskDetail?.title}</h2>
        {/* </Col> */}
      </Row>
      <Row>
        <Col span={12}>
          <h3>Assigned To</h3>
          <p>{taskDetail?.assignedTo}</p>
        </Col>
        <Col span={12}>
          <h3>Status</h3>
          <p>{taskDetail?.status}</p>
        </Col>
        <Col span={12}>
          <h3>Priority</h3>
          <p>{taskDetail?.priority}</p>
        </Col>
        <Col span={12}>
          <h3>Start Date</h3>
          <p>{taskDetail?.startDate}</p>
        </Col>
        <Col span={12}>
          <h3>End Date</h3>
          <p>{taskDetail?.endDate}</p>
        </Col>
      </Row>
    </div>
  );
}
