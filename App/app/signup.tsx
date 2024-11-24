import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.SHORT);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show('Invalid email format', ToastAndroid.SHORT);
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters', ToastAndroid.SHORT);
      return;
    }

    // Account creation logic here (e.g., API call)
    ToastAndroid.show('Account Created Successfully!', ToastAndroid.SHORT);
    router.replace('/signin'); // Navigate to Sign In screen
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
        <Text style={styles.title}>Create New Account</Text>

        {/* Full Name Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter Your Full Name"
            style={styles.input}
            onChangeText={(value) => setFullName(value)}
          />
        </View>

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

        {/* Create Account Button */}
        <TouchableOpacity onPress={OnCreateAccount} style={styles.createAccountButton}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Navigate to Sign In */}
        <TouchableOpacity style={styles.signInButton} onPress={() => router.replace('/signin')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    flex: 1,
    
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 20,
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
  createAccountButton: {
    padding: 18,
    backgroundColor: '#003f88',
    borderRadius: 15,
    marginTop: 50,
  },
  createAccountButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signInButton: {
    padding: 18,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  signInButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
