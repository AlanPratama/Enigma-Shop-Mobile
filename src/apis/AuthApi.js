import { axiosInstance } from "./axiosInstance";
import store from "../redux/store";
import { login, logout, setError, setIsLoading } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthApi {
  static async login(dataRequest) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const res = await axiosInstance.post("/auth/signin", dataRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        await AsyncStorage.setItem("access_token", res.data.access_token);
        store.dispatch(login(jwtDecode(res.data.access_token)));
      }
      
      return res;
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("AuthApi: ", error);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async register(dataRequest) {
    try {
      const res = await axiosInstance.post(
        "/auth/signup/customer",
        dataRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("AuthApi register: ", error.message);
      return error;
    }
  }

  static async logout() {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));
      await AsyncStorage.removeItem("access_token");
      store.dispatch(logout());
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("AuthApi logout: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}
