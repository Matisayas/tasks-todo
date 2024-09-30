import api from "..";
import { AuthPayloadDTO } from "./types";

const getProfile = async (): Promise<AuthPayloadDTO> => {
  const token = localStorage.getItem("AUTH_JWT_TOKEN");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
