import React from 'react';
import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import { useWindowDimensions } from 'react-native';

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Prevent rendering before fonts are loaded
  }

  return (
    <LinearGradient
      colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
      locations={[0, 0.22, 0.85]} // Define color stops correctly
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }} // Ensure gradient covers the whole screen
    >
      {/* Header Section */}
      <View
        style={{
          height: 60,
          width: '100%',
          flexDirection: "row",
          backgroundColor: 'white',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Image
          source={require("../assets/images/image1.png")}
          style={{ height: 46, width: 99 }}
        />
        <Image
          source={require("../assets/images/image2.png")}
          style={{ height: 27, width: 45, marginLeft: 110 }}
        />
        <Image
          source={require("../assets/images/image3.png")}
          style={{ height: 30, width: 55 }}
        />
      </View>

      {/* Title Section */}
      <View style={{ marginTop: 80, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'Kameron-SemiBold',
            fontSize: 40,
            color: '#274C77',
            textAlign: 'center',
          }}
        >
          DWLRS MONITOR
        </Text>

        <Text
          style={{
            marginTop: 15,
            fontSize: 12,
            fontFamily: 'Kameron-SemiBold',
            color: '#274C77',
            textAlign: 'center',
            lineHeight: 18,
          }}
        >
          A software application for analysis of {'\n'}
          DWLR data and raise alarms in respect of {'\n'}
          anomalous values, faulty DWLRs etc.
        </Text>
      </View>

      {/* Box Section */}
      <View style={{ marginVertical: 15, justifyContent: 'center' }}>
        <Image
          source={require('../assets/images/image4.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
        />

        <View style={{ flexDirection: 'row', position: 'absolute', marginLeft: 55 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>14000</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 10 }}>
              Total DWLRS
            </Text>
          </View>

          <Image source={require('../assets/images/image5.png')} style={{ marginHorizontal: 15 }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>14000</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 10 }}>
              Active
            </Text>
          </View>

          <Image source={require('../assets/images/image5.png')} style={{ marginHorizontal: 15 }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>14000</Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Kameron-SemiBold',
                color: '#fff',
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              Problematic
            </Text>
          </View>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity onPress={() => router.push("/signin")}>
        <View
          style={{
            width: 122,
            height: 42,
            borderRadius: 22,
            backgroundColor: '#DEFFFC',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 15,
          }}
        >
          <Text
            style={{
              color: '#274c77',
              fontFamily: 'Kameron-SemiBold',
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            LOGIN
          </Text>
        </View>
      </TouchableOpacity>

      <Image
        source={require("../assets/images/five.png")}
        style={{ marginLeft: -55, marginTop: -15 }}
      />
    </LinearGradient>
  );
}
