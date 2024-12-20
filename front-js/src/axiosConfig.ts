import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  config.headers["X-Common-Key"] = "user";
  return config;
});

export default instance;
