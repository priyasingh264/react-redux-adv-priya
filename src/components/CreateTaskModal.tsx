import React from "react";
import { Modal, Form, Input, DatePicker, Select, Row, Col, Button } from "antd";
import { useAppDispatch } from "../hooks";
import { createTaskAction } from "../store/tasks/thunk";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const { Option } = Select;

interface CreateTaskModalProps {
  open: boolean;
  onCancel: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  open,
  onCancel,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { isTaskCreating } = useSelector((state: RootState) => state.task);

  const handleCreate = () => {
    form
      .validateFields()
      .then(async values => {
        const newTask = {
          ...values,
          id: uuidv4(),
        };

        await dispatch(createTaskAction(newTask));
        form.resetFields();
        onCancel();
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleCreate}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isTaskCreating}
          onClick={handleCreate}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="create_task_form">
        <Form.Item
          name="title"
          label="Task Title"
          rules={[
            { required: true, message: "Please input the title of the task!" },
          ]}
        >
          <Input />
        </Form.Item>
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
        <Row gutter={12} justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Select placeholder="Select a status">
                <Option value="open">Open</Option>
                <Option value="inProgress">In Progress</Option>
                <Option value="underReview">Under Review</Option>
                <Option value="done">Done</Option>
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
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
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
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
