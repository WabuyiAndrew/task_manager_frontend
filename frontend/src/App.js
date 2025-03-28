"use client"

import { useState, useEffect } from "react"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import "./index.css"

function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/tasks/")
      if (!response.ok) throw new Error("Failed to fetch tasks")
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTask = async (task) => {
    try {
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })

      if (!response.ok) throw new Error("Failed to create task")

      await fetchTasks()
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleUpdateTask = async (task) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })

      if (!response.ok) throw new Error("Failed to update task")

      await fetchTasks()
      setCurrentTask(null)
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete task")

      await fetchTasks()
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleEditTask = (task) => {
    setCurrentTask(task)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
      </header>

      <main>
        <TaskForm
          onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
          initialTask={currentTask}
          onCancel={() => setCurrentTask(null)}
        />

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        )}
      </main>
    </div>
  )
}

export default App

