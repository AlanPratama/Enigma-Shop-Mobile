import { setCategories } from "../redux/products/categorySlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class CategoryApi {
    static async getCategories() {
        try {
            const res = await axiosInstance.get("/categories")
            // console.log("RES: ", res.data);
            // console.log("LENGTH: ", res.data.length);
            const items = res.data
            const total = res.data.length
            store.dispatch(setCategories({ items, total }))
        } catch (error) {
            console.log("CategoryApi: ", error);
        }
    }
}