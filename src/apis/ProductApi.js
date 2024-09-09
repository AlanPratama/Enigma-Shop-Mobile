import { setError, setIsLoading, setProducts } from "../redux/products/productsSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

class ProductApi {
  static async getProducts(query = "", page = 1, limit = 10) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(`/products`, {
        params: { query, page, limit },
      });

      store.dispatch(
        setProducts({
          items: page === 1 ? data.items : [...store.getState().products.items, ...data.items], // Jika page 1, reset data, jika tidak gabungkan
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

			
			const { data } = await axiosInstance.get(`/products/${productId}`);

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
