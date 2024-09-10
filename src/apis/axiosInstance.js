import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process?.env?.EXPO_PUBLIC_API_URL || "http://10.10.103.151:8080/api",
	timeout: 5000,
});
