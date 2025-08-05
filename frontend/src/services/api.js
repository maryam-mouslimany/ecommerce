import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = (url, method = "GET", data = {}, params = {}) => {
  return api({ url, method, data, params });
};

export default api;
