import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import store from "../redux/store";
import { login, logout } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import ProductDetail from "../screens/authorization/product/ProductDetail";
import CartScreen from "../screens/authorization/CartScreen";

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isAuthenticated: ", isAuthenticated);

  const setUser = async () => {
    const token = await AsyncStorage.getItem("access_token");
    console.log("tokenn: ", token);

    if (token) {
      store.dispatch(login(jwtDecode(token)));
    } else {
      store.dispatch(logout());
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false, statusBarStyle: "dark" }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />

            {isAuthenticated ? (
              <>
                <Stack.Screen name="Protected" component={ProtectedRoutes} />
                <Stack.Screen
                  name="Cart"
                  component={CartScreen}
                  options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    title: "My Cart",
                    contentStyle: {
                      backgroundColor: "white",
                    },
                    headerTitleStyle: {
                      fontSize: 23,
                    },
                  }}
                />
              </>
            ) : (
              <Stack.Screen name="Public" component={PublicRoutes} />
            )}

            <Stack.Screen
              options={{ headerShown: true }}
              name="ProductDetail"
              component={ProductDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
