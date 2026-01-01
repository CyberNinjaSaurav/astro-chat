import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const googleLogin = (token) =>
  API.post("/auth/google", { token });

export const sendChatMessage = (message) =>
  API.post(
    "/chat",
    { message },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }

  );

export default API;

