import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";

export default function CurrentBatteryLevel({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual query key and value if required
        const queryKey = "id";  // example, replace with actual key
        const queryValue = id;  // example, using 'id' passed as prop

        // Corrected API URL
        const response = await axios.get(`http://10.150.21.189:8000/api/v1/dwlr/info?${queryKey}=${queryValue}`);
        
        // Assuming the response is in the correct structure
        setData(response.data);
        setError(null);  // Clear any previous error
      } catch (err) {
        // If there's an error, display a message
        setError("Failed to fetch data. Please try again.");
        console.error(err);  // For debugging
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchData();
  }, [id]);  // Re-fetch data if the id changes

  // If data is still loading, show loading spinner
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#274C77" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If there's an error, show error message
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Destructure data from the response
  const { weeklyData = {}, currentBattery = 50 } = data || {};

  // Prepare data for the weekly overview chart
  const weeklyOverviewData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [
          weeklyData.week1 || 0,
          weeklyData.week2 || 0,
          weeklyData.week3 || 0,
          weeklyData.week4 || 0,
        ],
        colors: [
          (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
          (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
          (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        ],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewBox}>
        {/* Header */}
        <Text style={styles.headerText}>Battery Levels</Text>

        {/* Weekly Overview */}
        <View style={styles.weeklyOverview}>
          <Text style={styles.sectionTitle}>Weekly Overview</Text>
          <BarChart
            data={weeklyOverviewData}
            width={Dimensions.get("window").width * 0.7} // Adjust the width
            height={180}
            chartConfig={{
              backgroundGradientFrom: "#f8f9fa",
              backgroundGradientTo: "#f8f9fa",
              color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barPercentage: 0.5,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>

        {/* Battery Status */}
        <View style={styles.batteryStatus}>
          <Text style={styles.sectionTitle}>Battery Status</Text>
          <View style={styles.batteryContainer}>
            <View
              style={[styles.batteryFill, {
                width: `${currentBattery}%`,
                backgroundColor: currentBattery > 80
                  ? "#4CAF50"
                  : currentBattery > 60
                  ? "#81C784"
                  : currentBattery > 40
                  ? "#FFEB3B"
                  : currentBattery > 20
                  ? "#FF9800"
                  : "#F44336",
              }]}/>
          </View>
          <Text style={styles.batteryText}>{currentBattery}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    height: 500,
    alignItems: "center",
    width: "90%",
    maxWidth: 348,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#274C77",
    marginBottom: 20,
  },
  weeklyOverview: {
    width: "90%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  chart: {
    borderRadius: 8,
    padding: 10,
  },
  batteryStatus: {
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 16,
    width: "90%",
  },
  batteryContainer: {
    width: 150,
    height: 40,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 8,
  },
  batteryFill: {
    height: "100%",
    borderRadius: 15,
  },
  batteryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274C77",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
