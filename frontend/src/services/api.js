import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000//api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = (url, method = "POST", data = {}, params = {}) => {
  return api({ url, method, data, params });
};

export default api;
