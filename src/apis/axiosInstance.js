import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://10.10.103.166:3000/api/v1",
    withCredentials: true,
    timeout: 5000
})