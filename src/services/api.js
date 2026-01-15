import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL.trim(),
});

export const getTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
