import axiosInstance from "..";
import { LoginDto, LoginResponse } from "./types";

export const login = async (loginDto: LoginDto): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    loginDto
  );
  const { token } = response.data;
  // Guarda el token en el local storage
  localStorage.setItem("AUTH_JWT_TOKEN", token);

  return response.data;
};
