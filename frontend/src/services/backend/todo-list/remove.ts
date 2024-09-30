import api from "../index";

export const removeTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
