import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PB_URL = import.meta.env.VITE_PB_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL belum ada di .env");
}

if (!PB_URL) {
  throw new Error("VITE_PB_URL belum ada di .env");
}

export { API_URL, PB_URL };

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (userId) {
    config.headers["x-user-id"] = userId;
  } else if (user?.id) {
    config.headers["x-user-id"] = user.id;
  }

  return config;
});

export default api;
