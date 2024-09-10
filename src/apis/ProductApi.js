import {
  setError,
  setIsLoading,
  setProducts,
} from "../redux/products/productsSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ProductApi {
  static async getProducts(query = "", page = 1, limit = 10) {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log("TOKEN: ", token);

      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(`/products`, {
        params: { query, page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      store.dispatch(
        setProducts({
          items:
            page === 1
              ? data.items
              : [...store.getState().products.items, ...data.items],
          total: data.total,
        })
      );
    } catch (error) {
      store.dispatch(setError(error.message));
      throw new Error(`Product API getProducts: ${error.message}`);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getProduct(productId) {
    try {
      store.dispatch(setIsLoading(true));
      const token = await AsyncStorage.getItem("access_token");
      console.log(token);

      const { data } = await axiosInstance.get(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      store.dispatch(setError(error.message)); // Hanya simpan pesan error yang serializable
      throw new Error(`Product API getProducts: ${error.message}`);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ProductApi;
