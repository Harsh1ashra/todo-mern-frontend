import React, { useState } from "react";

const TaskForm = ({ addOrUpdateTask, editTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    
    addOrUpdateTask({
      title,
      id: editTask?._id || null,
    });

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter your task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
