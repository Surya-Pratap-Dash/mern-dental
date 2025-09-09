import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // your backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Named export for login
export const loginUser = async (form) => {
  const res = await api.post("/auth/login", form);
  return res.data;
};

// You can add more API functions here
export const registerUser = async (form) => {
  const res = await api.post("/auth/register", form);
  return res.data;
};

export default api;
