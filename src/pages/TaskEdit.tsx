import { NavLink, useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { editTaskAction, getTaskByIdAction } from "../store/tasks/thunk";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Header } from "../components";
import dayjs from "dayjs";
import { TASK_PRIORITY } from "../utils/constants";
import { TASK_STATUS } from "../utils/constants";
import { TaskPriorityEnum, TaskStatusEnum } from "../types";

const { Option } = Select;

export default function TaskEdit() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { taskDetail, isTaskDetailLoading } = useSelector(
    (state: RootState) => state.task
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(getTaskByIdAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (taskDetail) {
      form.setFieldsValue({
        ...taskDetail,
        startDate: dayjs(taskDetail.startDate),
      });
    }
  }, [taskDetail, form]);

  const handleSave = async () => {
    const updatedTask = {
      id: taskDetail?.id,
      ...form.getFieldsValue(),
      startDate: dayjs(form.getFieldsValue().startDate).format("DDMMMYYYY"),
      ...(form.getFieldsValue().status === TaskStatusEnum.DONE
        ? {
            endDate: dayjs().format("DDMMMYYYY"),
          }
        : { endDate: null }),
    };

    console.log({ updatedTask });

    await dispatch(editTaskAction(updatedTask));
    navigate("/");
  };

  if (isTaskDetailLoading || !taskDetail) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Spin size="large" />;
      </Row>
    );
  }

  console.log(taskDetail);

  return (
    <div>
      <Header>
        <Row align="middle" justify="start">
          <NavLink to="/">
            <Button type="link" icon={<ArrowLeftOutlined size={20} />}></Button>
          </NavLink>
          <h2>Edit Task - {taskDetail?.title}</h2>
        </Row>
      </Header>
      <Card>
        <Form form={form} layout="vertical" name="create_task_form">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Task Title"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of the task!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="assignedTo"
                label="Assigned To (Email)"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} justify={"space-between"}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
              >
                <Select placeholder="Select a status">
                  {Object.entries(TaskStatusEnum).map(([key, value]) => (
                    <Option value={key}>{TASK_STATUS[value]}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true, message: "Please select priority!" }]}
              >
                <Select placeholder="Select a priority">
                  {Object.entries(TaskPriorityEnum).map(([key, value]) => (
                    <Option value={key}>{TASK_PRIORITY[value]}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} justify={"space-between"}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select the start date!" },
                ]}
              >
                <DatePicker format="DDMMMYYYY" placeholder="Select a date" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Button type="primary" size="large" onClick={handleSave}>
              Save
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
