import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import AuthApi from "../apis/AuthApi";


import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import PushNotification from "../../usePushNotification";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}


export default function RegisterScreen() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(
    undefined
  );
  const notificationListener = useRef();
  const responseListener = useRef();


  
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const [showPassword, setShowPassword] = useState(false);

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("")

  const [username, setUsername] = useState("validUsernanames");
  // const [email, setEmail] = useState("validemail2@example.com");
  // const [name, setName] = useState("validname");
  const [password, setPassword] = useState("Valid@123");
  const [confirmPassword, setConfirmPassword] = useState("Valid@123");

  const navigate = useNavigation();

  const handleValidation = () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (username.length < 4) {
      return "Username must be longer than or equal to 4 characters.";
    }

    // if (!emailRegex.test(email)) {
    //   return "Email must be a valid email.";
    // }

    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be longer than or equal to 8 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  const handleRegister = async () => {
    const error = handleValidation();
    if (error) {
      Toast.show({
        type: "error",
        text1: "Register Gagal",
        text2: error,
        text1Style: {
          fontSize: 16,
          color: "#262626",
        },
        text2Style: {
          fontSize: 14,
          color: "#262626",
        },
      });
      return;
    }

    const res = await AuthApi.register({
      username,
      password,
    });

    if (res?.status === 201) {
      Toast.show({
        type: "success",
        text1: "Register Berhasil",
        text2: "Akun telah dibuat, silahkan login!",
        text1Style: {
          fontSize: 16,
          color: "#262626",
        },
        text2Style: {
          fontSize: 14,
          color: "#262626",
        },
      });

      // ALALALA
      await PushNotification.sendPushNotification(expoPushToken, "Register Berhasil!", "Silahkan login");

    } else {
      Toast.show({
        type: "error",
        text1: "Register Gagal",
        text2: "Username atau Email sudah dipakai.",
        text1Style: {
          fontSize: 16,
          color: "#262626",
        },
        text2Style: {
          fontSize: 14,
          color: "#262626",
        },
      });
    }
    return null; // Validation passed
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Toast position="top" />
      <View style={styles.formContainer}>
        <Text style={styles.header}>Silahkan Register</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Masukkan username..."
          style={styles.input}
        />
        {/* <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan email..."
          style={styles.input}
        /> */}
        {/* <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Masukkan name..."
          style={styles.input}
        /> */}
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Masukkan password..."
            style={styles.input}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#223e90"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Konfirmasi password..."
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
          activeOpacity={0.7}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Sudah Punya Akun? </Text>
          <TouchableOpacity onPress={() => navigate.navigate("Login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    width: "100%",
  },
  header: {
    fontSize: 24,
    color: "#223e90",
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  registerButton: {
    backgroundColor: "#314ea7",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  registerButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#223e90",
  },
  loginLink: {
    color: "#223e90",
    fontWeight: "bold",
  },
});
