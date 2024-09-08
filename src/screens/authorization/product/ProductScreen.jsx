import { View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import ProductApi from "../../../apis/ProductApi";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ProductScreen() {
  const data = useSelector((state) => state.products);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const getProducts = async (query = "") => {
    await ProductApi.getProducts(query);
  };

  useEffect(() => {
    getProducts(searchQuery);
  }, [searchQuery]);

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
      <TextInput 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Cari Product..."
        style={{
          backgroundColor: '#f0f0f0',
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
          marginHorizontal: 14
        }}
      />
      
      <FlatList
        data={data.items}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
