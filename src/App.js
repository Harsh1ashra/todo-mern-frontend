import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("incomplete");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      console.log("Tasks from backend:", res.data);
      setTasks(res.data || []);
    } catch (err) {
      console.error("Load tasks failed:", err.message);
      alert("Failed to load tasks from server");
    }
  };

  const addTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await createTask({ title: newTitle, status: "incomplete" });
      setTasks([...tasks, res.data]);
      setNewTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  const startEdit = (task) => {
    if (task.status === "complete") {
      alert("Cannot update task already completed");
      return;
    }
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditStatus(task.status);
  };

  const saveEdit = async (id) => {
    try {
      const res = await updateTask(id, { title: editTitle, status: editStatus });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditTaskId(null);
      setEditTitle("");
      setEditStatus("incomplete");
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTitle("");
    setEditStatus("incomplete");
  };

  const deleteTaskHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      {/* Add Task */}
      <div className="task-form-container">
        <input
          placeholder="Enter task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="task-item"
            style={{
              backgroundColor:
                task.status === "incomplete"
                  ? "#fef2f2"
                  : task.status === "inprogress"
                  ? "#fff7ed"
                  : "#ecfdf5",
            }}
          >
            {editTaskId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="edit-input"
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="inprogress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
                <div className="task-buttons">
                  <button className="edit-btn" onClick={() => saveEdit(task._id)}>
                    Save
                  </button>
                  <button className="delete-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="task-left">
                  <span className="task-name">{task.title}</span>
                  <span className={`status-badge status-${task.status}`}>
                    {task.status}
                  </span>
                </div>
                <div className="task-buttons">
                  <button className="edit-btn" onClick={() => startEdit(task)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => deleteTaskHandler(task._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


























