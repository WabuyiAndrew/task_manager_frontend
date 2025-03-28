"use client"

import { useState, useEffect } from "react"

function TaskForm({ onSubmit, initialTask, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState({ title: "" })

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description || "")
      setCompleted(initialTask.completed)
    } else {
      resetForm()
    }
  }, [initialTask])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCompleted(false)
    setErrors({ title: "" })
  }

  const validateForm = () => {
    const newErrors = { title: "" }
    let isValid = true

    if (!title.trim()) {
      newErrors.title = "Title is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const taskData = {
      ...(initialTask && { id: initialTask.id }),
      title,
      description,
      completed,
    }

    onSubmit(taskData)

    if (!initialTask) {
      resetForm()
    }
  }

  return (
    <div className="card task-form">
      <div className="card-header">
        <h2>{initialTask ? "Edit Task" : "Add New Task"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className={errors.title ? "error" : ""}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows={3}
          />
        </div>

        <div className="form-check">
          <input id="completed" type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          <label htmlFor="completed">Mark as completed</label>
        </div>

        <div className="form-actions">
          {initialTask && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {initialTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm

