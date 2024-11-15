import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State untuk search

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    };

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const showEditForm = (task) => {
        setTaskToEdit(task);
        handleShowForm();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter tasks berdasarkan search query
    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchQuery)
    );

    return (
        <Container className="my-5">
            <div className='row'>
                <div className='col-md-6 text-center'>
                    <h1 className="mb-4"><strong>To Do List</strong></h1>
                </div>
                <div className='col-md-6 text-center'>
                    <Button variant="primary" onClick={handleShowForm}>+ Add Task</Button>
                </div>
            </div>

            {tasks.length > 0 && (
                <div className="search-bar-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            )}


            <div className="task-list">
                <TaskList tasks={filteredTasks} deleteTask={deleteTask} showEditForm={showEditForm} />
                <TaskForm
                    show={showForm}
                    handleClose={handleCloseForm}
                    addTask={addTask}
                    editTask={editTask}
                    taskToEdit={taskToEdit}
                />
            </div>
        </Container>
    );
}

export default App;
