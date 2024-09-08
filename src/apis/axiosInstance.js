import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://10.10.103.166:3000/api/v1"
  baseURL: "https://38d4-118-99-107-124.ngrok-free.app/api/v1", //Ngrok zul
  withCredentials: true,
  timeout: 5000,
});
