import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function Analytic() {

  const router = useRouter();

  return (
    <LinearGradient
      colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
      locations={[0, 0.22, 28.5]} // Define color stops
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }} // Ensure gradient covers the whole screen
    >
      <View style={{ height: 60, width: '100%', paddingLeft: 15, flexDirection: "row", backgroundColor: 'white' }}>
        <Image
          source={require("../assets/images/image1.png")}
          style={{ height: 46, width: 99 }}
        />
        <Image
          source={require("../assets/images/image2.png")}
          style={{ height: 27, width: 45, left: 140, top: 8 }}
        />
        <Image
          source={require("../assets/images/image3.png")}
          style={{ height: 30, width: 55, left: 160, top: 8 }}
        />
      </View>

      <View>
        <Text>Analytic page coming soon</Text>
      </View>

      {/* Footer Section */}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/dashboard")}>
          <MaterialCommunityIcons name="view-dashboard-outline" size={26} color="#0077cc" />
          <Text style={{ fontSize: 12, color: '#0077cc' }}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/dwlrs")}>
          <FontAwesome6 name="anchor-circle-check" size={24} color="#0077cc" />
          <Text style={{ fontSize: 12, color: '#0077cc' }}>DWLR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/Report")}>
          <MaterialIcons name="report-problem" size={26} color="#0077cc" />
          <Text style={{ fontSize: 12, color: '#0077cc' }}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/alert")}>
          <FontAwesome5 name="bell" size={24} color="#0077cc" />
          <Text style={{ fontSize: 12, color: '#0077cc' }}>Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} >
          <Ionicons name="analytics" size={26} color="#0077cc" />
          <Text style={{ fontSize: 12, color: '#0077cc' }}>Analytics</Text>
        </TouchableOpacity>
      </View>


    </LinearGradient>
  )
}