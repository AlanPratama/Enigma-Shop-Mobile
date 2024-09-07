import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeIn } from 'react-native-reanimated'

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigation();

  return (
    <View className="bg-white min-h-screen flex justify-center items-center">
      <Animated.View entering={FadeIn.delay(200)} className="p-4 my-4 bg-white rounded-full">
        <Image
          source={require("../../assets/welcome.png")}
          alt="Enigma Shop"
          className="h-64 w-64 rounded-full"
        />
      </Animated.View>
      <View className="w-full px-8">
        <Animated.Text entering={FadeIn.delay(300)} className="text-2xl text-[#223e90] font-bold">
          Silahkan Login!
        </Animated.Text>
        <Animated.View entering={FadeIn.delay(400)}>
          <TextInput
            placeholder="Masukkan username..."
            className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2"
          />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(500)} className="relative">
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Masukkan password..."
            className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2"
          />
          <View className="absolute right-3 top-6">
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#223e90"
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(600)}>
          <TouchableOpacity
            className="bg-[#314ea7] border-2 border-gray-100 rounded-lg py-3 my-2"
            activeOpacity={0.7}
          >
            <Text className="text-center font-bold text-[#fff]">Login</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(700)} className="mt-2 flex justify-start items-center flex-row">
          <Text className="text-[#223e90]">Belum Punya Akun? </Text>
          <TouchableOpacity onPress={() => navigate.navigate("Register")}>
            <Text className="text-[#223e90] font-bold">Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
