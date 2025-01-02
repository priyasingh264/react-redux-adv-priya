import React from "react";
import { Modal, Form, Input, DatePicker, Select, Row, Col } from "antd";

const { Option } = Select;

interface CreateTaskModalProps {
  visible: boolean;
  onCancel: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      visible={visible}
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
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
          <Col span={12}>
            <Form.Item name="endDate" label="End Date">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
