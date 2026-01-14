import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

describe("TaskForm Component", () => {
  test("submits task with title", () => {
    const addOrUpdateTask = jest.fn();

    render(<TaskForm addOrUpdateTask={addOrUpdateTask} />);

    fireEvent.change(screen.getByPlaceholderText(/enter/i), {
      target: { value: "My Task" },
    });

    fireEvent.click(screen.getByText(/add/i));

    expect(addOrUpdateTask).toHaveBeenCalledWith(
      expect.objectContaining({ title: "My Task" })
    );
  });

  test("does not submit empty task", () => {
    const addOrUpdateTask = jest.fn();

    render(<TaskForm addOrUpdateTask={addOrUpdateTask} />);

    fireEvent.click(screen.getByText(/add/i));

    expect(addOrUpdateTask).not.toHaveBeenCalled();
  });
});
