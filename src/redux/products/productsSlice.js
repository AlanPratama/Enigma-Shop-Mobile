import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      const { items, total } = action.payload;
      state.items = items,
      state.total = total
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
})

export const { setError, setIsLoading, setProducts } = productsSlice.actions

export default productsSlice.reducer