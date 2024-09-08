import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
  },
});
