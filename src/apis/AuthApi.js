import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import store from "../redux/store";
import { login, logout, setError, setIsLoading } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthApi {
    static async login(dataRequest) {
        // try {
            store.dispatch(setError(null))
            store.dispatch(setIsLoading(true))

            const res = await axios.post("http://10.10.103.238:8080/api/auth/login", dataRequest, {
                headers: {
                    "Content-Type": "application/json"
                },
            })

            console.log("AuthApi res: ", res.data.data.token);
            

                await AsyncStorage.setItem("access_token", res.data.data.token)
                store.dispatch(login(jwtDecode(res.data.data.token)))
                console.log("DIPANGGIL LOGIN");
                

                store.dispatch(setIsLoading(false))
            return res
        // } catch (error) {
        //     store.dispatch(setError(error.message))
        //     console.log("AuthApi: ", error);
        // } finally {
        // }
    }

    static async register(dataRequest) {
            const res = await axios.post("http://10.10.103.238:8080/api/auth/register", dataRequest, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("res: ", res);
            
            return res

            // try {
            //     const res = await axiosInstance.post("/auth/register", dataRequest, {
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     })
            //     console.log("res: ", res);
                
            //     return res
            // } catch (error) {
            //     console.log("AuthApi register: ", error.message);
            //     return error
            // }
    }

    static async logout() {
        try {
            store.dispatch(setError(null))
            store.dispatch(setIsLoading(true))
            await AsyncStorage.removeItem("access_token")
            store.dispatch(logout())
        } catch (error) {
            store.dispatch(setError(error.message))
            console.log("AuthApi logout: ", error.message);
        } finally {
            store.dispatch(setIsLoading(false))
        }
    }

}