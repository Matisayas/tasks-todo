import api from "../index";

export const findOneTask = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};
