import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as api from "../services/api";

jest.mock("../services/api");

describe("App Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("adds a task and displays it", async () => {
    api.getTasks.mockResolvedValueOnce({ data: [] });

    api.createTask.mockResolvedValueOnce({
      data: {
        _id: "1",
        title: "New Task",
        status: "incomplete",
      },
    });

    render(<App />);

    fireEvent.change(
      screen.getByPlaceholderText(/enter task/i),
      { target: { value: "New Task" } }
    );

    fireEvent.click(screen.getByText(/add/i));

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });

    expect(api.createTask).toHaveBeenCalledTimes(1);
  });

  test("marks a task as complete and updates status", async () => {
    api.getTasks.mockResolvedValueOnce({
      data: [
        {
          _id: "1",
          title: "My Task",
          status: "incomplete",
        },
      ],
    });

    api.updateTask.mockResolvedValueOnce({
      data: {
        _id: "1",
        title: "My Task",
        status: "complete",
      },
    });

    render(<App />);

    // Wait for task to appear
    await waitFor(() => {
      expect(screen.getByText("My Task")).toBeInTheDocument();
    });

    // Click Update button to enter edit mode
    fireEvent.click(screen.getByText(/update/i));

    // Find the select input (dropdown)
    const statusSelect = screen.getByRole("combobox");

    // Change status to complete
    fireEvent.change(statusSelect, { target: { value: "complete" } });

    // Click Save
    fireEvent.click(screen.getByText(/save/i));

    // Wait for status badge to update
    await waitFor(() => {
      expect(screen.getByText(/complete/i)).toBeInTheDocument();
    });

    expect(api.updateTask).toHaveBeenCalledTimes(1);
  });

});



