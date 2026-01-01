import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const googleLogin = (token) =>
  API.post("/auth/google", { token });

// CHAT
export const sendChatMessage = (message) =>
  API.post("/chat/", { message });


export default API;
