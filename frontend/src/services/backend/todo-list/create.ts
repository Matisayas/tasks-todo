import api from "../index";
import { TaskCreateDto } from "./types";

export const createTask = async (task: TaskCreateDto) => {
  const response = await api.post(`/tasks`, task);
  return response.data;
};
