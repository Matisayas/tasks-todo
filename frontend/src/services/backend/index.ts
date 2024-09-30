import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

// Interceptor para agregar el token al header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para limpiar el token al hacer logout
export const logout = () => {
  localStorage.removeItem("token");
};

export default axiosInstance;
