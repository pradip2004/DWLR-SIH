import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, usePathname } from "expo-router";

export default function Footer() {
  const router = useRouter();
  const currentRoute = usePathname(); // Get the current route

  const isActive = (screen) => currentRoute === screen;

  const handlePress = (screen) => {
    if (currentRoute !== screen) {
      router.push(screen); // Navigate only if it's a different screen
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 70,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 15,
          backgroundColor: isActive("/dashboard") ? "#0077cc" : "transparent",
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress("/dashboard")}
      >
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={26}
          color={isActive("/dashboard") ? "white" : "#0077cc"}
        />
        <Text style={{ fontSize: 12,fontFamily: 'Kameron-SemiBold', color: isActive("/dashboard") ? "white" : "#0077cc" }}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 15,
          backgroundColor: isActive("/dwlrs") ? "#0077cc" : "transparent",
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress("/dwlrs")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={isActive("/dwlrs") ? "white" : "#0077cc"}
        />
        <Text style={{ fontSize: 12,fontFamily: 'Kameron-SemiBold', color: isActive("/dwlrs") ? "white" : "#0077cc" }}>
          DWLR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 15,
          backgroundColor: isActive("/report") ? "#0077cc" : "transparent",
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress("/report")}
      >
        <MaterialIcons
          name="report-problem"
          size={26}
          color={isActive("/report") ? "white" : "#0077cc"}
        />
        <Text style={{ fontSize: 12,fontFamily: 'Kameron-SemiBold', color: isActive("/report") ? "white" : "#0077cc" }}>
          Report
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 15,
          backgroundColor: isActive("/alert") ? "#0077cc" : "transparent",
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress("/alert")}
      >
        <FontAwesome5
          name="bell"
          size={24}
          color={isActive("/alert") ? "white" : "#0077cc"}
        />
        <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold',color: isActive("/alert") ? "white" : "#0077cc" }}>
          Alert
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 15,
          backgroundColor: isActive("/analytic") ? "#0077cc" : "transparent",
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress("/analytic")}
      >
        <Ionicons
          name="pie-chart"
          size={26}
          color={isActive("/analytic") ? "white" : "#0077cc"}
        />
        <Text style={{ fontSize: 12,fontFamily: 'Kameron-SemiBold', color: isActive("/analytic") ? "white" : "#0077cc" }}>
          Analytics
        </Text>
      </TouchableOpacity>
    </View>
  );
}
