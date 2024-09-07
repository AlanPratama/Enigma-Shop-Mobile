import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView className="bg-white">
      {/* Header with profile image */}
      <View className="relative bg-gradient-to-r from-[#262626] to-[#ffffff] h-64 w-full rounded-b-lg">
        {/* Back icon */}
        <Ionicons name="arrow-back" size={24} color="white" className="absolute top-6 left-4" />
        {/* Menu icon */}
        <Ionicons name="menu" size={24} color="white" className="absolute top-6 right-4" />
        {/* Profile image */}
        <View className="absolute left-1/2 -translate-x-1/2 top-16">
          <Image
            source={{ uri: 'https://tse2.mm.bing.net/th?id=OIP.l8N4H5EfKyEhQNqOelX49AHaHa&pid=Api&P=0&h=220' }}
            className="h-24 w-24 rounded-full border-4 border-white"
          />
        </View>
      </View>

      {/* User Info */}
      <View className="items-center mt-16">
        <Text className="text-xl font-bold text-[#223e90]">John Doe</Text>
        <Text className="text-gray-500">Product Designer</Text>
      </View>

      {/* Details Cards */}
      <View className="mt-4 px-6">
        {/* Joined Date */}
        <View className="flex-row items-center bg-white p-4 shadow-md rounded-lg my-2">
          <Ionicons name="calendar" size={24} color="#0072FF" />
          <View className="ml-4">
            <Text className="text-gray-500">Joined Date</Text>
            <Text className="font-bold text-[#223e90]">1 January 2020</Text>
          </View>
        </View>

        {/* Active Projects */}
        <View className="flex-row items-center bg-white p-4 shadow-md rounded-lg my-2">
          <Ionicons name="layers" size={24} color="#0072FF" />
          <View className="ml-4">
            <Text className="text-gray-500">Active Projects</Text>
            <Text className="font-bold text-[#223e90]">13</Text>
          </View>
        </View>

        {/* Projects Delivered */}
        <View className="flex-row items-center bg-white p-4 shadow-md rounded-lg my-2">
          <Ionicons name="paper-plane" size={24} color="#0072FF" />
          <View className="ml-4">
            <Text className="text-gray-500">Projects Delivered</Text>
            <Text className="font-bold text-[#223e90]">135</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
