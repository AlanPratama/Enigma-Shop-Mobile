import {
  setError,
  setIsLoading,
  setProducts,
} from "../redux/products/productsSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

class ProductApi {
  static async getProducts(query = "") {
    try {
      store.dispatch(setIsLoading(true));

      // Mengirim query parameter ke backend jika ada
      const { data } = await axiosInstance.get(`/products`, {
        params: { query }, // Kirim query sebagai parameter URL
      });

      store.dispatch(
        setProducts({
          items: data.items,
          total: data.total,
        })
      );
    } catch (error) {
      store.dispatch(setError(error.message)); // Hanya simpan pesan error yang serializable
      throw new Error(`Product API getProducts: ${error.message}`);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ProductApi;
