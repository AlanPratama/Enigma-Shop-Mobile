import store from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ProductApi {
  static async getProductById(productId) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));
    } catch (error) {
    } finally {
    }
  }
}
