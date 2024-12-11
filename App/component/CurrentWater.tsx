import React from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

const CurrentWater = () => {
  // Static data for testing
  const testData = [
    { date: "2024", waterLevel: 15 },
    { date: "2023", waterLevel: 20 },
    { date: "2022", waterLevel: 18 },
    { date: "2021", waterLevel: 25 },
    { date: "2020", waterLevel: 10 },
  ];

  const waterLevels = testData.map((item) => item.waterLevel);
  const highestWaterLevel = Math.max(...waterLevels);
  const lowestWaterLevel = Math.min(...waterLevels);

  // Line Chart Data
  const lineChartData = {
    labels: testData.map((item) => item.date),
    datasets: [
      {
        data: testData.map((item) => item.waterLevel),
        color: () => "#5D5FEF",
        strokeWidth: 2,
      },
    ],
    legend: ["Water Level"],
  };

  // Data for Pie Chart (Half-Donut)
  const pieChartData = [
    {
      name: "Present Month's Data",
      population: highestWaterLevel,
      color: "#1E83F6",
      legendFontColor: "#FFF",
      legendFontSize: 15,
    },
    {
      name: "Previous Month's Data",
      population: lowestWaterLevel,
      color: "#63A6F2",
      legendFontColor: "#FFF",
      legendFontSize: 15,
    },
  ];

  const loading = false; // Static loading state for testing
  const id = "12345"; // Static prediction ID for testing

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recent Water Levels</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#274C77" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          {/* Line Chart */}
          <View style={styles.chartContainer}>
            <LineChart
              data={lineChartData}
              width={320}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(93, 95, 239, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
            />
          </View>

          {/* Half-Donut Chart (PieChart) */}
          <View style={styles.pieChartContainer}>
            {/* Labels Above the Pie Chart */}
            <View style={styles.pieChartLabels}>
              {pieChartData.map((item, index) => (
                <Text key={index} style={[styles.labelText, { color: item.color }]}>
                  ● {item.name}
                </Text>
              ))}
            </View>

            {/* Pie Chart */}
            <PieChart
              data={pieChartData}
              width={320}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                color: (opacity = 1) => `rgba(93, 95, 239, ${opacity})`,
                // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[0, 10]} // Helps create the half-donut effect
              absolute
            />
          </View>


          {/* Data Display */}
          <View style={styles.dataContainer}>
            <View style={styles.dataBlock}>
              <Text style={styles.dataLabel}>Present Month's data</Text>
              <Text style={[styles.dataValue, { color: "#1E83F6" }]}>{highestWaterLevel}</Text>
            </View>
            <View style={styles.dataBlock}>
              <Text style={styles.dataLabel}>Previous Month's Data</Text>
              <Text style={[styles.dataValue, { color: "#63A6F2" }]}>{lowestWaterLevel}</Text>
            </View>
          </View>
          <Text style={styles.predictionId}>Current ID - {id}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#274C77",
    marginBottom: 16,
    paddingLeft: 20,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  loadingText: {
    marginTop: 10,
    color: "#555",
  },
  chartContainer: {
    borderRadius: 10,
    padding: 16,
    // marginBottom: 20,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginBottom: 16,
  },
  dataBlock: {
    alignItems: "center",
  },
  dataLabel: {
    fontSize: 12,
    color: "#555",
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  predictionId: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
  pieChartContainer: {
    borderRadius: 10,
    padding: 16,
    // marginBottom: 20,
    alignItems: "center", // Center the content
  },
  pieChartLabels: {
    flexDirection: "row", // Arrange labels horizontally
    justifyContent: "center", // Center the labels
    // marginBottom: 10, // Add spacing between labels and pie chart
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 10, // Spacing between labels
  },
});

export default CurrentWater;