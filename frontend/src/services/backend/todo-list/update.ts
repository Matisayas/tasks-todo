import api from "../index";
import { TaskUpdateDto } from "./types";

export const updateTask = async (id: string, task: TaskUpdateDto) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};
