"use client"

function TaskList({ tasks, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found. Add a new task to get started.</div>
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className="card task-card">
          <div className="task-content">
            <div className="task-status">
              <span className={`status-indicator ${task.completed ? "completed" : ""}`}></span>
            </div>
            <div className="task-details">
              <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
              {task.description && <p className={task.completed ? "completed" : ""}>{task.description}</p>}
            </div>
          </div>
          <div className="task-actions">
            <button className="btn btn-secondary" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList

