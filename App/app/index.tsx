import React from 'react';
import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import { useWindowDimensions } from 'react-native';
import Header from '@/component/Header';

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
     <Header/>

      <View style={{ marginTop: 80, }}>
        {/* Name Section */}
        <MaskedView
          maskElement={
            <Text style={{ fontFamily: 'Kameron-SemiBold', fontSize: 35, textAlign: 'center' }}>
              DWLRS MONITOR
            </Text>
          }
        >
          <LinearGradient
            colors={['#274C77', '#488DDD']}
            locations={[0.08, 0.45]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 375, height: 150 }}
          />
        </MaskedView>

        {/* Description Section */}
        <Text
          style={{
            marginTop: -85, // Reduce margin to minimize space
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

      {/* box section  */}
      <View style={{ marginVertical: 15, justifyContent: 'center' }}>
        <Image source={require('../assets/images/image4.png')} style={{
          width: '100%',
          resizeMode: 'contain',
        }} />


        <View style={{ flexDirection: 'row', position: 'absolute', marginLeft: 55, }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff', }}>14000</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 10, }}>Total DWLRS</Text>
          </View>

          <Image source={require('../assets/images/image5.png')} style={{ marginHorizontal: 15 }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff', }}>14000</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 10, }}>Active</Text>
          </View>

          <Image source={require('../assets/images/image5.png')} style={{ marginHorizontal: 15 }} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff', }}>14000</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 10, textAlign: 'center' }}>Problematic</Text>
          </View>
        </View>
      </View>

          {/* Buttons */}

 
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between', 
          width: 270, 
        }}
      >
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

        {/* Signup Button */}
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <View
            style={{
              width: 122,
              height: 42,
              borderRadius: 22,
              backgroundColor: '#DEFFFC',
              justifyContent: 'center',
              alignItems: 'center',
             
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
              SIGNUP
            </Text>
          </View>
        </TouchableOpacity>
      </View>


      <Image source={require("../assets/images/five.png")}
        style={{ marginLeft: -55, marginTop: 15, }}
      />



    </LinearGradient>
  );
}