import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload]
            state.total = state.total + 1;
        },
        increaseQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product.id === action.payload.id) {
                    product.quantity = product.quantity + 1
                    return product;
                }
                return product;
            });
        },
        decreaseQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product.id === action.payload.id) {
                    product.quantity = product.quantity - 1
                    return product;
                }
                return product;
            });
        },
        deleteProduct(state, action) {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
            state.total = state.total - 1;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { addProduct, increaseQuantity, decreaseQuantity, deleteProduct, setIsLoading, setError } = cartSlice.actions
export default cartSlice.reducer