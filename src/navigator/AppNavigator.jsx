import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import LoginScreen from '../screens/LoginScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import HomeScreen from '../screens/authorization/HomeScreen'

export default function AppNavigator() {
    const Stack = createNativeStackNavigator()
  return (
    <SafeAreaProvider>
        <SafeAreaView className="flex-1">
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Welcome' component={WelcomeScreen} />
                    <Stack.Screen name='Login' component={LoginScreen} />
                    <Stack.Screen name='Home' component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}