import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LineChart } from "react-native-chart-kit";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

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

  if (!fontsLoaded) {
    return null; // Add a loading state if fonts are not loaded
  }


  return (
    <LinearGradient
      colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
      locations={[0, 0.22, 0.85]} // Fixed locations
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <View style={{ height: 60, width: '100%', paddingLeft: 15, flexDirection: "row", backgroundColor: 'white' }}>
        <Image
          source={require("../assets/images/image1.png")}
          style={{ height: 46, width: 99 }}
        />
        <Image
          source={require("../assets/images/image2.png")}
          style={{ height: 27, width: 45, position: "absolute", right: 80, top: 8 }}
        />
        <Image
          source={require("../assets/images/image3.png")}
          style={{ height: 30, width: 55, position: "absolute", right: 20, top: 8 }}
        />
      </View>

      <ScrollView style={{ marginBottom: 71 }}>
        {/* Buttons */}
        <View style={{
          flexDirection: 'row',
          marginVertical: 30,
          justifyContent: 'space-evenly'
        }}>
          {["AI Sahayak", "Training"].map((title, index) => (
            <View
              key={index}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 135,
                height: 44,
                borderWidth: 3,
                borderColor: '#274C77',
              }}
            >
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>{title}</Text>
            </View>
          ))}
        </View>


        {/* Battery Section */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: -5,
          paddingVertical: 15,
          alignSelf: 'center',
          width: '90%',
          height: 500,
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Battery Levels</Text>
            <View style={[styles.cardContainer, { alignItems: 'center' }]}>
              {/* Weekly Overview Chart */}
              <View style={[styles.chartCard, { marginBottom: 20 }]}>
                <Text style={styles.cardTitle}>Weekly Overview</Text>
                <BarChart
                  data={batteryData}
                  width={screenWidth * 0.70} // Ensure chart fits within card
                  height={180}
                  yAxisSuffix="%"
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  showValuesOnTopOfBars={true}
                  style={styles.chartStyle}
                />
              </View>

              {/* Battery Status */}
              <View style={styles.batteryCard}>
                <Text style={styles.cardTitle}>Battery Status</Text>
                <View style={styles.batteryBarContainer}>
                  <View style={styles.batteryBar}>
                    <View style={styles.batteryFill} />
                  </View>
                  <Text style={styles.batteryPercentage}>97.13%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 20,
          alignSelf: 'center',
          width: '90%',
          height: 370,
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Estimated Charging Date:</Text>

          </View>

          {/* Battery Alerts Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🔔 Battery Alerts & Notifications</Text>
            <View style={styles.separator} />

            {/* Battery Status Section */}
            <View style={[styles.alertBox, styles.successBox]}>

            </View>

            {/* Future API Message Section */}
            <View style={[styles.alertBox, styles.infoBox]}>

            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 70,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10,
      }}>
        {[
          { name: "view-dashboard-outline", text: "Dashboard", route: "/dashboard", icon: MaterialCommunityIcons },
          { name: "anchor-circle-check", text: "DWLR", route: "/dwlrs", icon: FontAwesome6 },
          { name: "report-problem", text: "Report", route: "/report", icon: MaterialIcons },
          { name: "bell", text: "Alert", route: "/alert", icon: FontAwesome5 },
          { name: "analytics", text: "Analytics", route: null, icon: Ionicons }
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ alignItems: 'center', marginTop: 15 }}
            onPress={() => item.route && router.push(item.route)}
          >
            <item.icon name={item.name} size={26} color="#0077cc" />
            <Text style={{ fontSize: 12, color: '#0077cc' }}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
