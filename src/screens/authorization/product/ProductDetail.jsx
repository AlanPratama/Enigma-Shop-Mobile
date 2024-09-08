import { View, Text } from 'react-native'
import React from 'react'

export default function ProductDetail({route}) {
  const {productId} = route.params

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold">Detail Product ID: {productId}</Text>
    </View>
  )
}