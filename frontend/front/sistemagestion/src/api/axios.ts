import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/sgi",
  withCredentials: true,
});

export default instance;