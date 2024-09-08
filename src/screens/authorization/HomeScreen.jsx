import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AuthApi from '../../apis/AuthApi';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { logout } from '../../redux/auth/authSlice';

export default function HomeScreen() {

  const navigation = useNavigation()

  const { user } = useSelector((state) => state.auth)


  const handleLogout = async () => {
    try {
      // await AuthApi.logout()
      await store.dispatch(logout())
      await AsyncStorage.removeItem("access_token")
      
      console.log("Berhasil logout");
    } catch (error) {
      console.log("HomeScreen Err: ", error);
    }
  }
  console.log("USER: ", user);
  

  return (
    <View className="px-4 pt-4">
      <Text className="text-lg font-bold text-neutral-700">Selamat Datang {user.name}!</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  )
}