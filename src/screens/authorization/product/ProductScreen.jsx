import { View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import ProductApi from "../../../apis/ProductApi";
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDebounce } from "use-debounce";

export default function ProductScreen() {
  const data = useSelector((state) => state.products);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [queryDebounce] = useDebounce(searchQuery, 500)

  const getProducts = async (query = "") => {
    await ProductApi.getProducts(query);
  };

  useEffect(() => {
    getProducts(queryDebounce);
  }, [queryDebounce]);

  const renderItem = ({ item }) => (
    <Animated.View entering={FadeIn.delay(200)}>
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
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Animated.Text entering={FadeIn.delay(100)} className="text-2xl font-bold mb-4 text-center">Product List</Animated.Text>
      <Animated.View entering={FadeIn.delay(150)}>
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
        </Animated.View>
      
      <FlatList
        data={data.items}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
