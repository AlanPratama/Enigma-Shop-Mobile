import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";

export default function ProductDetail({ route }) {
  const navigation = useNavigation();
  const { productId } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const product = {
    id: "0a5133b5-51ef-420e-b59c-75fb400a6f28",
    name: "Self-Help Guide",
    description: "Bestselling self-improvement book",
    price: 180000,
    stock: 100,
    imageUrls: [
      "https://cdn.shopify.com/s/files/1/0070/7032/files/product-label-design.jpg?v=1680902906",
    ],
    createdAt: "2024-08-29T02:24:21.000Z",
    updatedAt: "2024-08-29T02:24:21.000Z",
    categories: [
      {
        id: 3,
        name: "Books",
        description: "Books and publications",
        createdAt: "2024-08-29T02:24:21.000Z",
        updatedAt: "2024-08-29T02:24:21.000Z",
      },
    ],
    reviews: [],
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[product]}
      renderItem={({ item }) => (
        <ProductDetailComponent product={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

function ProductDetailComponent({ product, navigation }) {
  const [liked, setLiked] = React.useState(false);
  const width = Dimensions.get("window").width;

  return (
    <View className="flex flex-1 h-screen">
      <View className="items-center">
        {product.imageUrls ? (
          <View className="w-full h-80">
            <Carousel
              loop
              width={width}
              data={[...product.imageUrls]}
              renderItem={({ item }) => (
                <View className="flex flex-1">
                  <Image
                    source={{ uri: item }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              )}
            />
          </View>
        ) : (
          <View className="w-full h-60 rounded-lg bg-gray-300 justify-center items-center">
            <Text className="text-lg font-bold text-gray-500">
              Tidak ada gambar
            </Text>
          </View>
        )}
      </View>

      <View className="rounded-t-3xl -mt-6 p-6 flex flex-col flex-1 bg-white">
        <View className="flex-1">
          <Text className="text-gray-400">{product.categories[0]?.name}</Text>
          <View className="flex flex-row justify-between">
            <Text className="text-2xl font-bold text-black">
              {product.name}
            </Text>
            <Pressable className="my-auto" onPress={() => setLiked(!liked)}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                color={liked ? "red" : "black"}
                size={24}
              />
            </Pressable>
          </View>
          <Text className="text-xl font-bold text-red-400">
            IDR {product.price.toLocaleString()}
          </Text>
          <Text className="text-gray-400 mt-4">{product.description}</Text>
          <Text className="text-sm text-gray-500 mt-2">
            Stok: {product.stock}
          </Text>
        </View>

        <View className="flex-row justify-around align-bottom flex-1 -mt-64 space-x-4">
          <Pressable
            className="p-3 my-auto border w-1/2"
            onPress={() => alert("Ditambahkan ke keranjang!")}
          >
            <Text className="text-black text-center font-bold">
              + Keranjang
            </Text>
          </Pressable>
          <Pressable
            className="bg-black border p-3 my-auto w-1/2"
            onPress={() => alert("Punya alan kecil")}
          >
            <Text className="text-white text-center font-bold">Beli</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
