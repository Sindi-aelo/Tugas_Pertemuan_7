import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'To Do':
        return 'secondary';
      case 'In Progress':
        return 'warning';
      case 'Done':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'To Do':
        return 0;
      case 'In Progress':
        return 50;
      case 'Done':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.id} className="mb-3 task-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className={`circle-indicator ${task.status
                    .toLowerCase()
                    .replace(' ', '-')} me-5`}
                />
                <div className="d-flex">
                  <div className="me-5">
                    <small className="text-muted d-block mb-2">Task</small>
                    <h5 className="mb-0">{task.name}</h5>
                  </div>
                  <div className="me-5">
                    <small className="text-muted d-block mb-2">Priority</small>
                    <Badge bg={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                  </div>
                  <div className="me-5">
                    <small className="text-muted d-block mb-2">Status</small>
                    <Badge bg={getStatusVariant(task.status)}>{task.status}</Badge>
                  </div>
                  <div className="progress-circle-container">
                    <svg width={24} height={24}>
                      <circle
                        cx={12}
                        cy={12}
                        r={10}
                        fill="none"
                        stroke="#e9ecef"
                        strokeWidth={2}
                      />
                      <circle
                        cx={12}
                        cy={12}
                        r={10}
                        fill="none"
                        stroke={
                          task.status === 'Done'
                            ? '#4caf50'
                            : task.status === 'In Progress'
                            ? '#ffb74d'
                            : '#6c757d'
                        }
                        strokeWidth={2}
                        strokeDasharray={62.83}
                        strokeDashoffset={62.83 - (62.83 * getProgressPercentage(task.status)) / 100}
                        transform="rotate(-90 12 12)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => showEditForm(task)}
                >
                  <i className="bi bi-pencil" />
                </Button>
                <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
                  <i className="bi bi-trash" />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
