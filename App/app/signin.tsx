import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios"; // Import Axios
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";



export default function SignIn() {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Sign In Function
  const handleSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Invalid email format", ToastAndroid.SHORT);
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show("Password must be at least 6 characters", ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await axios.post("http://192.168.137.83:8000/api/auth/signin", {
        email,
        password,
      });

      if (response.data.token) {
        ToastAndroid.show("Sign In Successful", ToastAndroid.SHORT);
        // Save token to AsyncStorage or other secure storage
        await AsyncStorage.setItem("token", response.data.token);

        // Navigate to dashboard
        router.replace("/dashboard");
      } else {
        ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error during login:", error);
      ToastAndroid.show("An error occurred. Please try again.", ToastAndroid.SHORT);
    }
  };

  return (
    <LinearGradient
      colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
      locations={[0, 0.22, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={moderateScale(30)} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Let's Sign You In</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>

        {/* Email Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter Your Email ID"
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            keyboardType="email-address"
          />
        </View>

        {/* Password Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter Your Password"
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign In with Google */}
        <TouchableOpacity
          style={styles.signInButton2}
          onPress={() => {
            Linking.openURL("http://192.168.137.83:8000/api/auth/google").catch((err) =>
              console.error("Failed to open URL:", err)
            );
          }}
        >
          <View style={styles.iconAndTextContainer}>
            <AntDesign name="google" size={moderateScale(23)} color="black" style={styles.icon} />
            <Text style={styles.signInButtonText2}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text
              style={styles.signUpLink}
              onPress={() => router.replace("/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(25),
    backgroundColor: "transparent",
    flex: 1,
    paddingTop: moderateScale(40),
  },
  title: {
    fontSize: moderateScale(30),
    marginTop: moderateScale(30),
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: moderateScale(20),
    color: "grey",
    marginTop: moderateScale(10),
  },
  inputContainer: {
    marginTop: moderateScale(30),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  input: {
    padding: moderateScale(15),
    borderWidth: 1,
    borderRadius: moderateScale(15),
    borderColor: "grey",
    marginTop: moderateScale(5),
  },
  signInButton: {
    padding: moderateScale(18),
    backgroundColor: "#003f88",
    borderRadius: moderateScale(15),
    marginTop: moderateScale(35),
  },
  signInButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: moderateScale(16),
  },
  signInButton2: {
    padding: moderateScale(15),
    backgroundColor: "white",
    borderRadius: moderateScale(15),
    marginTop: moderateScale(30),
    borderWidth: 1,
    borderColor: "grey",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: moderateScale(8),
  },
  signInButtonText2: {
    color: "black",
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },
  signUpContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  signUpText: {
    fontSize: moderateScale(16),
  },
  signUpLink: {
    fontWeight: "bold",
    fontSize: moderateScale(18),
    color: "#003459",
  },
});