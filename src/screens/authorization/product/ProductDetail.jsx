import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, Text, Image, Dimensions, FlatList, RefreshControl, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { addProduct } from "../../../redux/cart/cartSlice";
import store from "../../../redux/store";

export default function ProductDetail({ route }) {
	const [refreshing, setRefreshing] = React.useState(false);
	const { products: cartProduct } = useSelector((state) => state.cart);
	const [isOnCart, setIsOnCart] = React.useState(false);

	const { productId } = route.params;
	const product = useSelector((state) => state.products.items.find((item) => item.id === productId));

	const checkProduct = () => {
		const isProductOnCart = cartProduct.find((product) => product.id == productId);
		if (!!isProductOnCart) {
			setIsOnCart(true);
		}
	};

	React.useEffect(() => {
		checkProduct();
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<FlatList
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			data={[product]}
			renderItem={({ item }) => <ProductDetailComponent product={item} setIsOnCart={setIsOnCart} isOnCart={isOnCart} />}
			keyExtractor={(item) => item.id}
		/>
	);
}

function ProductDetailComponent({ product, isOnCart, setIsOnCart }) {
	const navigation = useNavigation();
	const [liked, setLiked] = React.useState(false);
	const width = Dimensions.get("window").width;

	const handleShare = async () => {
		try {
			const result = await Share.share({
				message: `Cek produk ini: ${product.name}\Harga: Rp ${product.price.toLocaleString()}\n${product.description}\n\nHanya di Enigma Shop`,
			});
			// if (result.action === Share.sharedAction) {
			//   if (result.activityType) {
			//   } else {
			//   }
			// } else if (result.action === Share.dismissedAction) {
			// }
		} catch (error) {
			alert(error.message);
			Toast.show({
				type: "error",
				text1: "Terjadi kesalahan",
				text2: error.message,
				text1Style: {
					fontSize: 16,
					color: "#262626",
				},
				text2Style: {
					fontSize: 14,
					color: "#262626",
				},
			});
		}
	};

	const addedToCart = () => {
		store.dispatch(addProduct(product));
		setIsOnCart(true);
		Toast.show({
			type: "success",
			text1: "Sukses",
			text2: "Berhasil menambahkan ke keranjang!",
			text1Style: {
				fontSize: 16,
				color: "#262626",
			},
			text2Style: {
				fontSize: 14,
				color: "#262626",
			},
		});
	};

	return (
		<View className='flex flex-1 h-screen'>
			<View className='items-center'>
				{product.imageUrls ? (
					<View className='w-full h-80'>
						<Carousel
							loop
							width={width}
							data={[...product.imageUrls]}
							renderItem={({ item }) => (
								<View className='flex flex-1'>
									<Image source={{ uri: item }} style={{ width: "100%", height: "100%" }} resizeMode='cover' />
								</View>
							)}
						/>
					</View>
				) : (
					<View className='w-full h-60 rounded-lg bg-gray-300 justify-center items-center'>
						<Text className='text-lg font-bold text-gray-500'>Tidak ada gambar</Text>
					</View>
				)}
			</View>

			<View className='rounded-t-3xl -mt-6 p-6 flex flex-col flex-1 bg-white'>
				<View className='flex-1'>
					<Text className='text-gray-400'>{product.categories[0]?.name}</Text>
					<View className='flex flex-row justify-between'>
						<Text className='text-2xl font-bold text-black w-3/4'>{product.name}</Text>
						<View className='flex flex-row gap-2'>
							<Pressable className='my-auto' onPress={handleShare}>
								<Ionicons name='share-social-outline' color='black' size={24} />
							</Pressable>
							<Pressable className='my-auto' onPress={() => setLiked(!liked)}>
								<Ionicons name={liked ? "heart" : "heart-outline"} color={liked ? "red" : "black"} size={24} />
							</Pressable>
						</View>
					</View>
					<Text className='text-xl font-bold text-red-400'>Rp {product.price.toLocaleString()}</Text>
					<Text className='text-gray-400 mt-4'>{product.description}</Text>
					<Text className='text-sm text-gray-500 mt-2'>Stok: {product.stock}</Text>
				</View>

				<View className='flex-row justify-around align-bottom flex-1 -mt-64 space-x-4'>
					{isOnCart ? (
						<Pressable className='p-3 my-auto border w-1/2' onPress={() => navigation.navigate("Cart")}>
							<Text className='text-black text-center font-bold'>Already on Cart</Text>
						</Pressable>
					) : (
						<Pressable
							className='p-3 my-auto border w-1/2'
							onPress={() => {
								addedToCart();
							}}
						>
							<Text className='text-black text-center font-bold'>+ Add to Cart</Text>
						</Pressable>
					)}
					<Pressable className='bg-black border p-3 my-auto w-1/2' onPress={() => alert("Punya alan kecil")}>
						<Text className='text-white text-center font-bold'>Buy Now</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
