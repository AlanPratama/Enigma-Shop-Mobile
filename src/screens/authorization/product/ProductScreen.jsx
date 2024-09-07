import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ProductApi from "../../../apis/ProductApi";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ProductScreen() {
  const [quantity, setQuantity] = useState(0);
  const data = useSelector((state) => state.products);
  const navigation = useNavigation();

  const getProducts = async () => {
    await ProductApi.getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(data);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
      style={{
        backgroundColor: 'white', 
        padding: 16, 
        marginVertical: 8,
        marginHorizontal: 16, 
        borderRadius: 8, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 8, 
        elevation: 3, 
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 16, color: 'gray' }}>Stock: {item.stock}</Text>
      </View>
      <Text style={{ marginTop: 8, color: 'gray' }}>{item.description}</Text>
      <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Rp {item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">Product List</Text>
      <FlatList
        data={data.items}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>

    // <View className="flex-1 bg-white p-4">
    //   <Text className="text-2xl font-bold mb-4 text-center">Product List</Text>

    //   <View className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4">
    //     <Text className="text-lg">Spaghety Wow</Text>

    //     <View className="flex-row items-center">
    //       <TouchableOpacity
    //         onPress={decrease}
    //         className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center mr-2"
    //       >
    //         <Text className="text-xl font-bold">-</Text>
    //       </TouchableOpacity>

    //       <Text className="text-lg">{quantity}</Text>

    //       <TouchableOpacity
    //         onPress={increase}
    //         className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center ml-2"
    //       >
    //         <Text className="text-lg">+</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
}
