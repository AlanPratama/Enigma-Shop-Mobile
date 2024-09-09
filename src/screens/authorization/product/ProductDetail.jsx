import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { addProduct } from "../../../redux/cart/cartSlice";
import store from "../../../redux/store";
import PagerView from "react-native-pager-view";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ProductDetail({ route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const { products: cartProduct } = useSelector((state) => state.cart);
  const [isOnCart, setIsOnCart] = React.useState(false);

  const { productId } = route.params;
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === productId)
  );

  const checkProduct = () => {
    const isProductOnCart = cartProduct.find(
      (product) => product.id == productId
    );
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[product]}
      renderItem={({ item }) => (
        <ProductDetailComponent
          product={item}
          setIsOnCart={setIsOnCart}
          isOnCart={isOnCart}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

function ProductDetailComponent({ product, isOnCart, setIsOnCart }) {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [readMore, setIsReadMore] = React.useState(false);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Cek produk ini: ${
          product.name
        }\nHarga: Rp ${product.price.toLocaleString()}\n${
          product.description
        }\n\nHanya di Enigma Shop`,
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
    <View className="flex flex-1 h-screen">
      <View className="items-center">
        {product.imageUrls ? (
          <>
            <PagerView
              className="w-full h-80"
              initialPage={0}
              onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
              {product.imageUrls.map((image, index) => {
                return (
                  <Animated.View entering={FadeIn.delay(100)} key={index}>
                    <Image
                      source={{
                        uri: image,
                      }}
                      className="h-full w-full"
                    />
                  </Animated.View>
                );
              })}
            </PagerView>

            <View className="flex-row justify-center fixed bottom-8 z-10">
              {product.imageUrls.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentPage ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
          </>
        ) : (
          <View className="w-full h-60 bg-gray-300 justify-center items-center">
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
            <Text className="text-2xl font-bold text-black w-3/4">
              {product.name}
            </Text>
            <View className="flex flex-row gap-2">
              <Pressable className="my-auto" onPress={handleShare}>
                <Ionicons name="share-social-outline" color="black" size={24} />
              </Pressable>
              <Pressable className="my-auto" onPress={() => setLiked(!liked)}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  color={liked ? "red" : "black"}
                  size={24}
                />
              </Pressable>
            </View>
          </View>
          <Text className="text-xl font-bold text-blue-400">
            Rp {product.price.toLocaleString()}
          </Text>
          <Text
            className="text-gray-400 mt-4"
            numberOfLines={readMore ? 999 : 5}
          >
            {product.description}
          </Text>
          <Pressable onPress={() => setIsReadMore(!readMore)}>
            <Text className="text-gray-600">
              {readMore ? "Show Less" : "Read More"}
            </Text>
          </Pressable>
          <Text className="text-sm text-gray-500 mt-2">
            Stok: <Text className="text-red-400">{product.stock}</Text>
          </Text>
        </View>

        <View className="flex-row justify-around align-bottom -mt-64 space-x-4">
          <Pressable
            className="p-3 my-auto border border-blue-500 w-1/2"
            onPress={() => {
              isOnCart ? navigation.navigate("Cart") : addedToCart();
            }}
          >
            <Text className="text-blue-400 text-center font-bold">
              {isOnCart ? "Already on Cart" : "+ Add to Cart"}
            </Text>
          </Pressable>
          <Pressable
            className="bg-blue-400 border border-blue-400 p-3 my-auto w-1/2"
            onPress={() => alert("Punya alan kecil")}
          >
            <Text className="text-white text-center font-bold">Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
