import React from "react";
import { View, Text, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

// Get screen width for responsiveness
const screenWidth = Dimensions.get("window").width;

function FutureWater() {
  // Static manual data
  const manualData = [
    { date: "2024", waterLevel: 30 },
    { date: "2022", waterLevel: 28 },
    { date: "2021", waterLevel: 25 },
    { date: "2020", waterLevel: 22 },
    { date: "2019", waterLevel: 27 },
  ];

  const loading = false; // Static loading state
  const id = "Manual123"; // Static prediction ID

  const waterLevels = manualData.map((item) => item.waterLevel);
  const highestWaterLevel = Math.max(...waterLevels);
  const lowestWaterLevel = Math.min(...waterLevels);

  const pieChartData = [
    {
      name: "Highest Prediction",
      value: highestWaterLevel,
      color: "#FF9800",
    },
    {
      name: "Lowest Prediction",
      value: lowestWaterLevel,
      color: "#F44336",
    },
  ];

  const lineChartData = {
    labels: manualData.map((item) => item.date),
    datasets: [
      {
        label: "Water Level",
        data: manualData.map((item) => item.waterLevel),
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green line
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        height: 650,
        alignSelf: "center",
        alignItems: "center",
        width: "90%",
        maxWidth: 348,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#274C77",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Projected Water Levels
      </Text>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center", height: 200 }}>
          <ActivityIndicator size="large" color="#274C77" />
        </View>
      ) : (
        <>
          {/* Line Chart Section */}
          <View
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: 10,
              marginBottom: 20,
              elevation: 5,
              paddingBottom: 10, // Added padding to avoid space issues
              width: "100%", // Ensure the chart takes full width inside container
              maxWidth: 348, // Max width to keep it aligned
            }}
          >
            <LineChart
              data={lineChartData}
              width={screenWidth - 60} // Decrease width to fit properly within the container
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                borderRadius: 10,
                alignSelf: "center", // Center the chart horizontally
              }}
            />
          </View>

          {/* Pie Chart Section */}
          <View style={{ marginBottom: 20, paddingBottom: 10, width: "100%" }}>
            <PieChart
              data={pieChartData}
              width={screenWidth - 110} // Adjust the width to match container
              height={150}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              absolute
              style={{
                alignSelf: "center", // Center the pie chart horizontally
              }}
            />
          </View>

          {/* Future Month Data Section */}
          <View
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: 10,
              padding: 15,
              marginBottom: 20,
              elevation: 5,
              width: "100%", // Ensure it takes full container width
              maxWidth: 348, // Max width for alignment
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#274C77",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Future Month Data
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: "#7F7F7F" }}>Highest Prediction</Text>
                <Text style={{ fontSize: 18, color: "#FF9800", fontWeight: "bold" }}>
                  {highestWaterLevel}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: "#7F7F7F" }}>Lowest Prediction</Text>
                <Text style={{ fontSize: 18, color: "#F44336", fontWeight: "bold" }}>
                  {lowestWaterLevel}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 10, color: "#7F7F7F", marginTop: 10, textAlign: "center" }}>
              Prediction ID: {id}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

export default FutureWater;
