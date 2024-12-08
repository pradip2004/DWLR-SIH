import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LineChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

import Footer from "@/component/Footer";
import Header from "@/component/Header";

import CurrentWater from "@/component/CurrentWater";
import DashboardBox from "@/component/DashboardBox";
import FutureWater from "@/component/FutureWater";

export default function Analytic() {

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
    'Kameron-Medium': require('../assets/fonts/Kameron/Kameron-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),

  });





  return (
    <LinearGradient
      colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
      locations={[0, 0.22, 28.5]} // Define color stops
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }} // Ensure gradient covers the whole screen
    >
      <Header />



      <ScrollView style={{ marginBottom: 71 }}>
        <View style={{
          flexDirection: 'row',
          marginVertical: 20,
          justifyContent: 'space-evenly'
        }}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 135,
              height: 44,

              backgroundColor: '#274C77',



            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#fff' }}>AI Sahayak</Text>
          </View>

          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 22,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 135,
              height: 44,
              backgroundColor: '#274C77',

            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#fff' }}>Training</Text>
          </View>

        </View>

        {/* Dwlr id  */}

        <View style={{ justifyContent: 'center', alignSelf: 'center', }}>
          <View
            style={{
              height: 60, width: 300,
              borderRadius: 10, borderWidth: 1, borderColor: '#274c77', backgroundColor: '#fff',
              justifyContent: 'space-between',
              marginBottom: 10, padding: 10, flexDirection: 'row'
            }}>
            <TextInput
              style={{ fontSize: 18 }}
              placeholder="Enter DWLR id(e.g, 1,2..)"
              keyboardType="phone-pad"

            />
            <MaterialIcons name="search" size={40} />
          </View>
        </View>
        {/* 1st box  */}

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 20,
          height: 710,
          alignSelf: 'center',
          // justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>
          <CurrentWater data={undefined} loading={undefined} id={undefined} />
        </View>
        {/* 2ND BOX  */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 20,
          height: 650,
          alignSelf: 'center',
          // justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>

          <FutureWater data={undefined} loading={undefined} id={undefined} />
        </View>


      </ScrollView>











      {/* Footer Section */}
      <Footer />

    </LinearGradient>
  )
}