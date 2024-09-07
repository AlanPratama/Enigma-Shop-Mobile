import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./products/productsSlice";

export default configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});
