import React from 'react';

const statusColors = {
  incomplete: '#f44336',   
  inprogress: '#ff9800', 
  complete: '#4caf50',      
};

function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: statusColors[task.status] || '#ccc',
              color: '#fff',
              marginRight: '10px',
            }}
          >
            {task.status}
          </span>
          <span>{task.title}</span>
          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDelete(task._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
