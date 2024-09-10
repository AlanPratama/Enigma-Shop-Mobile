import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn } from 'react-native-reanimated'

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);

    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("")

    const [username, setUsername] = useState("validUsername2"); 
    // const [email, setEmail] = useState("validemail2@example.com");
    // const [name, setName] = useState("validname"); 
    const [password, setPassword] = useState("Valid@123");
    const [confirmPassword, setConfirmPassword] = useState("Valid@123"); 

    const navigate = useNavigation()

    const handleValidation = () => {
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
      if (username.length < 4) {
          return "Username must be longer than or equal to 4 characters.";
      }
  
      // if (!emailRegex.test(email)) {
      //     return "Email must be a valid email.";
      // }
  
      if (!passwordRegex.test(password)) {
          return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be longer than or equal to 8 characters.";
      }
  
      if (password !== confirmPassword) {
          return "Passwords do not match.";
      }
  
      return null; // Validation passed
  };

    const handleRegister = async () => {
      const error = handleValidation()
      if(error) {
        Toast.show({
          type: "error",
          text1: "Register Gagal",
          text2: error,
          text1Style: {
            fontSize: 16,
            color: "#262626"
          },
          text2Style: {
            fontSize: 14,
            color: "#262626"
          }
        })
        return
      }      

      const res = await AuthApi.register({
        username, password
      })

      console.log("REG RES: ", res);
      

      if(res.status === 201) {
        Toast.show({
          type: "success",
          text1: "Register Berhasil",
          text2: "Akun telah dibuat, silahkan login!",
          text1Style: {
            fontSize: 16,
            color: "#262626"
          },
          text2Style: {
            fontSize: 14,
            color: "#262626"
          }
        })
      } else {
        console.log("ERROR: ", res);
        
        Toast.show({
          type: "error",
          text1: "Register Gagal",
          text2: "Username atau Email sudah dipakai.",
          text1Style: {
            fontSize: 16,
            color: "#262626"
          },
          text2Style: {
            fontSize: 14,
            color: "#262626"
          }
        })
      }

    }

  return (
    <View className="bg-white min-h-screen flex justify-center items-center">
      <View className="w-full px-8">
        <Animated.Text entering={FadeIn.delay(100)} className="text-2xl text-[#223e90] font-bold">Silahkan Register</Animated.Text>
        <Animated.View entering={FadeIn.delay(150)}>
            <TextInput placeholder='Masukkan username...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View>
        {/* <Animated.View entering={FadeIn.delay(200)}>
            <TextInput value={email} onChangeText={setEmail} placeholder='Masukkan email...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(250)}>
            <TextInput value={name} onChangeText={setName} placeholder='Masukkan name...' className="bg-white border-2 border-gray-200 rounded-lg p-2 px-3 my-2" />
        </Animated.View> */}
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