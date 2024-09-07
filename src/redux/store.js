import { configureStore } from "@reduxjs/toolkit";
import productReducer  from "./products/productsSlice"

export default configureStore({
  reducer: {
    products: productReducer
  }
})