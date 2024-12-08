import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LineChart } from "react-native-chart-kit";


const screenWidth = Dimensions.get("window").width;

import Footer from "@/component/Footer";
import Header from "@/component/Header";

import CurrentWater from "@/component/CurrentWater";
import DashboardBox from "@/component/DashboardBox";
import FutureWater from "@/component/FutureWater";

export default function Analytic() {

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    fillShadowGradient: "#4CAF50", // Bar fill color
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    style: {
      borderRadius: 16,
    },
  };

  const batteryData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [50, 75, 60, 90], // Battery drain percentages
      },
    ],
  };


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
      locations={[0, 0.22, 0.85]} // Fixed locations
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
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
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F7FFF7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: 'Kameron-SemiBold',
    color: '#364FC7',
  },
  headerAction: {
    fontSize: 14,
    color: '#2F9E44',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Kameron-SemiBold',
    color: '#495057',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 10,
  },
  alertBox: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  successBox: {
    backgroundColor: '#DFFFE0',
    borderColor: '#2F9E44',
    borderWidth: 1,
    height: 75,
  },
  infoBox: {
    backgroundColor: '#F8F9FA',
    borderColor: '#ADB5BD',
    borderWidth: 1,
    height: 75,
  },
  alertTitle: {
    fontSize: 14,
    fontFamily: 'Kameron-SemiBold',
    color: '#495057',
    marginBottom: 5,
  },
  alertText: {
    fontSize: 14,
    color: '#495057',
    fontFamily: 'Kameron-SemiBold',
  },
  boldText: {
    fontFamily: 'Kameron-SemiBold',
  },

  // batery alert section
  container: {
    flex: 1,
    padding: 25,

  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#11263c",
    marginBottom: 20,
    marginTop: -34,
    fontFamily: 'Kameron-SemiBold',
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",

  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: screenWidth * 0.75,
    padding: 10,
    alignItems: "center",

  },
  batteryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: screenWidth * 0.75,
    padding: 35,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
    fontFamily: 'Kameron-SemiBold',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  batteryBarContainer: {
    alignItems: "center",

  },
  batteryBar: {
    width: 100,
    height: 35,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
  },
  batteryFill: {
    width: "57%",
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  batteryPercentage: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4CAF50",
  },
});
