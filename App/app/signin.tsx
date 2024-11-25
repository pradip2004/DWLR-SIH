import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignIn() {
  const router = useRouter();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Sign In Function
  const handleSignIn = () => {
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

    // Proceed with authentication logic
    ToastAndroid.show("Sign In Successful", ToastAndroid.SHORT);
    router.replace('/dashboard'); // Example redirection after sign-in
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
            <Ionicons name="arrow-back-circle" size={30} color="black" />
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
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push("/dashboard")}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Sign In with Google */}
          <TouchableOpacity style={styles.signInButton2}>
            <View style={styles.iconAndTextContainer}>
              <AntDesign name="google" size={23} color="black" style={styles.icon} />
              <Text style={styles.signInButtonText2}>Sign In with Google</Text>
            </View>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Text
                style={styles.signUpLink}
                onPress={() => router.replace('/signup')}
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
    padding: 25,
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: 'grey',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey',
    marginTop: 5,
  },
  signInButton: {
    padding: 18,
    backgroundColor: '#003f88',
    borderRadius: 15,
    marginTop: 35,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize:16
  },
  signInButton2: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'grey',
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  signInButtonText2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#003459',
  },
});
