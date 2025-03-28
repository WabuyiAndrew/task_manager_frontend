import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import TaskList from "../../src/components/TaskList"

describe("TaskList", () => {
  const mockDelete = jest.fn()
  const mockEdit = jest.fn()

  const tasks = [
    { id: 1, title: "Task 1", description: "Description 1", completed: false },
    { id: 2, title: "Task 2", description: "Description 2", completed: true },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders empty state when no tasks", () => {
    render(<TaskList tasks={[]} onDelete={mockDelete} onEdit={mockEdit} />)
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument()
  })

  test("renders tasks correctly", () => {
    render(<TaskList tasks={tasks} onDelete={mockDelete} onEdit={mockEdit} />)

    expect(screen.getByText("Your Tasks")).toBeInTheDocument()
    expect(screen.getByText("Task 1")).toBeInTheDocument()
    expect(screen.getByText("Description 1")).toBeInTheDocument()
    expect(screen.getByText("Task 2")).toBeInTheDocument()
    expect(screen.getByText("Description 2")).toBeInTheDocument()

    // Check for completed task styling
    const task2Title = screen.getByText("Task 2")
    expect(task2Title).toHaveClass("completed")
  })

  test("calls edit function when edit button clicked", () => {
    render(<TaskList tasks={tasks} onDelete={mockDelete} onEdit={mockEdit} />)

    const editButtons = screen.getAllByRole("button", { name: /edit/i })
    fireEvent.click(editButtons[0])

    expect(mockEdit).toHaveBeenCalledWith(tasks[0])
  })

  test("calls delete function when delete button clicked", () => {
    render(<TaskList tasks={tasks} onDelete={mockDelete} onEdit={mockEdit} />)

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i })
    fireEvent.click(deleteButtons[1])

    expect(mockDelete).toHaveBeenCalledWith(tasks[1].id)
  })
})

