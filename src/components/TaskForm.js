import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
    const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        taskToEdit ? editTask(task) : addTask(task);
        setTask({ name: '', priority: 'Medium', status: 'To Do' });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="modal-header">
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form>
                    <Form.Group controlId="taskName">
                        <Form.Label className="form-label">Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group controlId="taskPriority" className="mt-3">
                        <Form.Label className="form-label">Priority</Form.Label>
                        <Form.Control
                            as="select"
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="taskStatus" className="mt-3">
                        <Form.Label className="form-label">Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskForm;
