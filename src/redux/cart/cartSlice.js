import { createSlice } from "@reduxjs/toolkit";

const countTotalPrice = (products) => {
	let totalPrice = 0;
	products.forEach((product) => {
		if (product.selected == true) {
			totalPrice += product.price * product.quantity;
		}
	});
	return totalPrice;
};

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		total: 0,
		totalPrice: 0,
		selectedAll: false,
		isLoading: false,
		error: null,
	},
	reducers: {
		addProduct: (state, action) => {
			state.products = [...state.products, { ...action.payload, quantity: 1, selected: true }];
			state.total = state.total + 1;
			state.totalPrice = state.totalPrice + action.payload.price;
			let isAllSelected = true;
			state.products.forEach((product) => {
				if (product.selected == false) {
					isAllSelected = false;
				}
			});
			state.selectedAll = isAllSelected;
		},
		increaseQuantity: (state, action) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload) {
					product.quantity = product.quantity + 1;
					return product;
				}
				return product;
			});
			state.totalPrice = countTotalPrice(state.products);
		},
		decreaseQuantity: (state, action) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload) {
					product.quantity = product.quantity - 1;
					return product;
				}
				return product;
			});
			state.totalPrice = countTotalPrice(state.products);
		},
		deleteProduct(state, action) {
			state.products = state.products.filter((item) => item.id !== action.payload);
			state.total = state.total - 1;
			let isAllSelected = true;
			state.products.forEach((product) => {
				if (product.selected == false) {
					isAllSelected = false;
				}
			});
			state.selectedAll = isAllSelected;
			state.totalPrice = countTotalPrice(state.products);
		},
		setSelectProduct: (state, action) => {
			state.products = state.products.map((product) => {
				if (product.id === action.payload) {
					product.selected = !product.selected;
					return product;
				}
				return product;
			});
			let isAllSelected = true;
			state.products.forEach((product) => {
				if (product.selected == false) {
					isAllSelected = false;
				}
			});
			state.selectedAll = isAllSelected;
			state.totalPrice = countTotalPrice(state.products);
		},
		setSelectAll: (state) => {
			state.products = state.products.map((product) => {
				product.selected = true;
				return product;
			});
			state.totalPrice = countTotalPrice(state.products);
			state.selectedAll = true;
		},
		setSelectNone: (state) => {
			state.products = state.products.map((product) => {
				product.selected = false;
				return product;
			});
			state.totalPrice = 0;
			state.selectedAll = false;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { addProduct, increaseQuantity, decreaseQuantity, deleteProduct, setIsLoading, setError, setSelectProduct, setSelectAll, setSelectNone } =
	cartSlice.actions;
export default cartSlice.reducer;
