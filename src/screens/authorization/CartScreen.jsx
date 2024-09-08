import { useNavigation } from "@react-navigation/native";
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";

import store from "../../redux/store";
import { decreaseQuantity, deleteProduct, increaseQuantity, setSelectAll, setSelectNone, setSelectProduct } from "../../redux/cart/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
	const { products, selectedAll, totalPrice } = useSelector((state) => state.cart);
	const navigation = useNavigation();

	const handleOnSelectAll = () => {
		if (selectedAll) {
			store.dispatch(setSelectNone());
		} else {
			store.dispatch(setSelectAll());
		}
	};
	const handleOnSelectProduct = (id) => {
		store.dispatch(setSelectProduct(id));
	};
	const handleOnDecreaseQuantity = (id) => {
		store.dispatch(decreaseQuantity(id));
	};
	const handleOnIncreaseQuantity = (id) => {
		store.dispatch(increaseQuantity(id));
	};
	const handleOnDeleteProduct = (id) => {
		store.dispatch(deleteProduct(id));
	};

	const renderItem = ({ item }) => (
		<Animated.View entering={FadeIn.delay(200)}>
			<View className='border border-gray-400 border-1 rounded-xl p-4 flex flex-row justify-between mx-4 my-2'>
				<View className='flex flex-row gap-1'>
					<CheckBox onClick={() => handleOnSelectProduct(item.id)} isChecked={item.selected} />
					<View>
						<Image
							source={item.imageUrl ? { uri: item.imageUrl } : require("../../../assets/imageNotFound.png")}
							className='w-[80px] h-[80px] rounded-[6px] bg-blue-100'
						/>
					</View>
				</View>
				<View className='flex-grow ml-4 justify-around'>
					<TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}>
						<Text className='text-gray-500'>{item.name}</Text>
					</TouchableOpacity>
					<Text className='font-bold'>Rp {item.price.toLocaleString("id-ID")}</Text>
					<View className='flex flex-row justify-between'>
						<TouchableOpacity>
							<Ionicons name='heart-outline' size={24} color='black' />
						</TouchableOpacity>
						<View className='flex items-center flex-row gap-3'>
							{item.quantity <= 1 ? (
								<TouchableOpacity className='border-blue-800 rounded-lg border-2' onPress={() => handleOnDeleteProduct(item.id)}>
									<Ionicons name='trash' size={18} color='black' />
								</TouchableOpacity>
							) : (
								<TouchableOpacity className='border-blue-800 rounded-lg border-2' onPress={() => handleOnDecreaseQuantity(item.id)}>
									<Ionicons name='remove-outline' size={18} color='black' />
								</TouchableOpacity>
							)}
							<Text className='text-lg'>{item.quantity}</Text>
							{item.quantity >= item.stock ? (
								<Text>You already select all stock</Text>
							) : (
								<TouchableOpacity className='border-blue-800 rounded-lg border-2' onPress={() => handleOnIncreaseQuantity(item.id)}>
									<Ionicons name='add' size={18} color='black' />
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>
			</View>
		</Animated.View>
	);

	return (
		<View className='flex-1'>
			<View className='flex-1'>
				<FlatList data={products} showsVerticalScrollIndicator={false} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
			</View>
			<View className='p-4 flex-row flex-shrink-0 justify-between items-center border border-t-1 border-t-gray-200 shadow-lg'>
				<View className='flex flex-row items-center gap-2'>
					<CheckBox onClick={handleOnSelectAll} isChecked={selectedAll} />
					<Text>Select All</Text>
				</View>
				<View className='flex gap-4 flex-row'>
					<View className='flex flex-col justify-around text-black'>
						<Text className='text-gray-500 text-right'>Total</Text>
						<Text className='text-lg font-bold text-right'>Rp {totalPrice.toLocaleString("id-ID")}</Text>
					</View>
					<TouchableOpacity className={`flex-shrink-0 py-3 px-6 rounded-xl ${totalPrice == 0 ? "bg-gray-500" : "bg-[#314ea7]"}`} disabled={totalPrice == 0}>
						<Text className='text-center text-white text-base'>Checkout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default CartScreen;
