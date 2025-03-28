"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import TaskForm from "../../src/components/TaskForm"

describe("TaskForm", () => {
  const mockSubmit = jest.fn()
  const mockCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders add task form correctly", () => {
    render(<TaskForm onSubmit={mockSubmit} initialTask={null} onCancel={mockCancel} />)

    expect(screen.getByText("Add New Task")).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/completed/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /cancel/i })).not.toBeInTheDocument()
  })

  test("renders edit task form correctly", () => {
    const task = { id: 1, title: "Test Task", description: "Test Description", completed: false }
    render(<TaskForm onSubmit={mockSubmit} initialTask={task} onCancel={mockCancel} />)

    expect(screen.getByText("Edit Task")).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toHaveValue("Test Task")
    expect(screen.getByLabelText(/description/i)).toHaveValue("Test Description")
    expect(screen.getByRole("button", { name: /update task/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
  })

  test("validates form submission", () => {
    render(<TaskForm onSubmit={mockSubmit} initialTask={null} onCancel={mockCancel} />)

    // Try to submit with empty title
    fireEvent.click(screen.getByRole("button", { name: /add task/i }))
    expect(mockSubmit).not.toHaveBeenCalled()
    expect(screen.getByText("Title is required")).toBeInTheDocument()

    // Fill in title and submit
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Task" } })
    fireEvent.click(screen.getByRole("button", { name: /add task/i }))
    expect(mockSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "",
      completed: false,
    })
  })

  test("handles form cancellation", () => {
    const task = { id: 1, title: "Test Task", description: "Test Description", completed: false }
    render(<TaskForm onSubmit={mockSubmit} initialTask={task} onCancel={mockCancel} />)

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))
    expect(mockCancel).toHaveBeenCalled()
  })
})

