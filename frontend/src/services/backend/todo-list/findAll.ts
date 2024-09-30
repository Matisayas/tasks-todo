import api from "../index";
import { TaskFiltersForm } from "./types";

export const findAllTasks = async (filter?: TaskFiltersForm) => {
  try {
    const response = await api.get(`/tasks`, {
      params: {
        archived: filter?.archived.toString(),
        category: filter?.category,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    throw error;
  }
};
