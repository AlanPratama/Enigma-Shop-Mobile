import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen() {


  const { user } = useSelector((state) => state.auth)


  
  console.log("USER: ", user);
  

  return (
    <View className="px-4 pt-4">
      <Text className="text-lg font-bold text-neutral-700">Selamat Datang {user.name}!</Text>
    </View>
  )
}