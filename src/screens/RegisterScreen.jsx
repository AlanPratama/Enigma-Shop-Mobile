import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn } from 'react-native-reanimated'

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigation()

  return (
    <View className="bg-white min-h-screen flex justify-center items-center">
      <View className="w-full px-8">
        <Animated.Text entering={FadeIn.delay(100)} className="text-2xl text-[#223e90] font-bold">Silahkan Register</Animated.Text>
        <Animated.View entering={FadeIn.delay(150)}>
            <TextInput placeholder='Masukkan username...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(200)}>
            <TextInput placeholder='Masukkan username...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(250)}>
            <TextInput placeholder='Masukkan username...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(300)}>
            <TextInput placeholder='Masukkan username...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(350)} className="relative">
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
        <Animated.View entering={FadeIn.delay(400)}>
    <TouchableOpacity className="bg-[#314ea7] border-2 border-gray-100 rounded-lg py-3 my-2" activeOpacity={0.7}><Text className="text-center font-bold text-[#fff]">Register</Text></TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(450)} className="mt-2 flex justify-start items-center flex-row">
          <Text className="text-[#223e90]">Belum Punya Akun? </Text> 
          <TouchableOpacity onPress={() => navigate.navigate("Login")}><Text className="text-[#223e90] font-bold">Login</Text></TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}