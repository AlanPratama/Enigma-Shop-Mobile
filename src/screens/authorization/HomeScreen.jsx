import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductApi from "../../apis/ProductApi";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { items: itemsProduct } = useSelector((state) => state.products);
  const [likedItems, setLikedItems] = useState([]);
  const navigation = useNavigation();

  const toggleLike = (itemId) => {
    setLikedItems((prevLikedItems) =>
      prevLikedItems.includes(itemId)
        ? prevLikedItems.filter((id) => id !== itemId)
        : [...prevLikedItems, itemId]
    );
  };

  const categories = [
    {
      id: 1,
      name: "Foods",
      icon: "restaurant-outline",
    },
    {
      id: 2,
      name: "Sports",
      icon: "football-outline",
    },
    {
      id: 3,
      name: "Technology",
      icon: "laptop-outline",
    },
    {
      id: 4,
      name: "Fashion",
      icon: "shirt-outline",
    },
    {
      id: 5,
      name: "Health & Fitness",
      icon: "fitness-outline",
    },
    {
      id: 6,
      name: "Travel",
      icon: "airplane-outline",
    },
    {
      id: 7,
      name: "Education",
      icon: "book-outline",
    },
  ];

  const getProducts = async (query = "") => {
    await ProductApi.getProducts(query);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="px-3 mt-3 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-neutral-700">
          <Text className="text-[#255bff]">ENIGMA</Text> SHOP
        </Text>
        <View className="flex-row justify-center items-center gap-x-1">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="cart-outline" size={24} color="black" />
        </View>
      </View>
      <PagerView className="flex-[0.66]" initialPage={0}>
        <Animated.View
          entering={FadeIn.delay(100)}
          className="p-3 bg-[#255bfffd] m-3 h-48 rounded-2xl flex-row justify-between items-center"
          key="1"
        >
          <View className="gap-2">
            <Text className="text-lg text-white font-bold">NEW COLLECTION</Text>
            <Text className="text-2xl text-white font-bold">45% OFF</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-neutral-700 w-[88px] p-2 rounded-lg"
            >
              <Text className="text-white text-sm font-bold text-center">
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/carousel.png")}
            className="h-48 w-44"
          />
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(100)}
          className="p-3 bg-[#255bfffd] m-3 h-48 rounded-2xl flex-row justify-between items-center"
          key="2"
        >
          <View className="gap-2">
            <Text className="text-lg text-white font-bold">NEW COLLECTION</Text>
            <Text className="text-2xl text-white font-bold">45% OFF</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-neutral-700 w-[88px] p-2 rounded-lg"
            >
              <Text className="text-white text-sm font-bold text-center">
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/carousel.png")}
            className="h-48 w-44"
          />
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(100)}
          className="p-3 bg-[#255bfffd] m-3 h-48 rounded-2xl flex-row justify-between items-center"
          key="3"
        >
          <View className="gap-2">
            <Text className="text-lg text-white font-bold">NEW COLLECTION</Text>
            <Text className="text-2xl text-white font-bold">45% OFF</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-neutral-700 w-[88px] p-2 rounded-lg"
            >
              <Text className="text-white text-sm font-bold text-center">
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/carousel.png")}
            className="h-48 w-44"
          />
        </Animated.View>
      </PagerView>

      <View className="p-3">
        <Animated.Text
          entering={FadeIn.delay(150)}
          className="mb-4 text-2xl font-bold text-neutral-700"
        >
          Kategori Produk
        </Animated.Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mb-4"
        >
          {categories.map((cat) => (
            <Animated.View
              key={cat.id}
              entering={FadeIn.delay(200)}
              className="flex flex-row"
            >
              <View className="grid grid-flow-row mx-2 w-[80px]">
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="bg-[#3466fc] p-2 rounded-full mx-auto"
                >
                  <Ionicons name={cat.icon} color="white" size={40} />
                </TouchableOpacity>
                <Text className="text-black text-center">{cat.name}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View className="p-3">
        <Animated.Text
          entering={FadeIn.delay(150)}
          className="mb-3 text-2xl font-bold text-neutral-700"
        >
          Rekomendasi Produk
        </Animated.Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {itemsProduct &&
            itemsProduct.map((item) => (
              <Animated.View
                key={item.id}
                entering={FadeIn.delay(250)}
                className=" mr-4 items-center bg-neutral-100 shadow-xl p-4 rounded-xl"
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("ProductDetail", { productId: item.id })
                  }
                >
                  <View className="relative">
                    <Image
                      source={
                        item.imageUrl
                          ? { uri: item.imageUrl }
                          : { uri: "https://placehold.co/160x160/png" }
                      }
                      className="w-[160px] h-[160px] rounded-[6px] bg-blue-100"
                    />
                    <TouchableOpacity
                      onPress={() => toggleLike(item.id)}
                      className="absolute top-0 right-0 p-2"
                    >
                      <Ionicons
                        name={
                          likedItems.includes(item.id)
                            ? "heart"
                            : "heart-outline"
                        }
                        size={24}
                        color={likedItems.includes(item.id) ? "red" : "black"}
                      />
                    </TouchableOpacity>
                    {/* <Text
                      numberOfLines={1}
                      className="absolute top-0 left-0 px-2 pr-3 py-1 text-sm bg-white border-b border-r border-gray-100 rounded-br-xl font-bold text-neutral-700"
                    >
                      {item.categories[0].name}
                    </Text> */}
                  </View>

                  <View className="mt-1">
                    <Text
                      numberOfLines={1}
                      className="text-lg font-bold text-neutral-700"
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-[16px] font-bold text-[#3466fc]"
                    >
                      Rp {item.price.toLocaleString("id-ID")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
