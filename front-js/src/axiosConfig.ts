import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "X-Common-Key": "79C446ECB8EB7C770E13EAFBF84CC2D6743BDE85AEE2B9CF0818D39D4D4C9467",
    "Content-Type": "application/json"
  }
});

export default instance;