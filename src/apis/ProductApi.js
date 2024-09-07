import { setError, setIsLoading, setProducts } from "../redux/products/productsSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

class ProductApi {
  // static async getProducts() {
  //   try {
  //     const response = await axiosInstance.get("/api/v1/products");
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(`Product API getProducts: ${error.message}`);
  //   }
  // }
  static async getProducts() {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/api/v1/products");
      store.dispatch(
        setProducts({
          items: data.items,
          total: data.total,
        })
      )
    } catch (error) {
      store.dispatch(setError(error))
      throw new Error(`Product API getProducts: ${error.message}`)
    } finally {
      store.dispatch(setIsLoading(false))
    }
  }
}

export default ProductApi;
