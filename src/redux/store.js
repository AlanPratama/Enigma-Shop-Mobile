import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./product/productSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
