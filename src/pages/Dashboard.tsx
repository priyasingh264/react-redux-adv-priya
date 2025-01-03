import { Button, Col, Row } from "antd";
import { useState } from "react";
import { Header, TaskTable, CreateTaskModal } from "../components";

function Dashboard() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  return (
    <div>
      <Header>
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
      </Header>
      <TaskTable />
    </div>
  );
}

export default Dashboard;
