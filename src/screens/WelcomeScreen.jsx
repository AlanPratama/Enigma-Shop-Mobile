import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login")
        }, 2500)
    }, [])

  return (
    <View className="bg-white min-h-screen flex justify-center items-center">
      <Animated.Image entering={FadeIn.delay(100)} source={require("../../assets/enigmaGrow.png")} className="w-72 h-72" />
      <Animated.Text entering={FadeIn.delay(300)} className="font-bold text-3xl text-[#223e90]">Enigma Shop</Animated.Text>
    </View>
  )
}