import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import ProductDetail from "../screens/authorization/product/ProductDetail"

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} initialParams={{ isLogin }} />

            {isLogin ? (
                <Stack.Screen name="Protected" component={ProtectedRoutes} />
            ) : (
                <Stack.Screen name="Public" component={PublicRoutes} />
            )}
            
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
