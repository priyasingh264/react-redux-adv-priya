import { Button, Col, Row } from "antd";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import "./Header.css";

export default function Header() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  return (
    <nav className="header">
      <Row align="middle" justify="space-between">
        <Col>
          <h2>Task Management With Redux</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setShowCreateTaskModal(true)}>
            Create task
          </Button>
        </Col>
      </Row>
      <CreateTaskModal
        open={showCreateTaskModal}
        onCancel={() => setShowCreateTaskModal(false)}
      />
    </nav>
  );
}
