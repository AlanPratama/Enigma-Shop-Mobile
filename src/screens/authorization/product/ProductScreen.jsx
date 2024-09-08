import { View, Text, Pressable } from "react-native";
import React from "react";

export default function ProductScreen({ navigation }) {
  return (
    <View>
      <Text>ProductScreen</Text>
      <View className="w-3/4 mx-auto">
        <Pressable
          onPress={() => {
            navigation.navigate("ProductDetail", {
              productId: "0a5133b5-51ef-420e-b59c-75fb400a6f28",
            });
          }}
          className="flex items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm ransition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <Text className="text-white">Go To Product Details (Dev)</Text>
        </Pressable>
      </View>
    </View>
  );
}
