import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process?.env?.EXPO_PUBLIC_API_URL || "http://10.10.103.151:3000/api/v1",
	timeout: 5000,
});
