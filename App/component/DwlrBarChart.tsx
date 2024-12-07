import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions, View, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

const DwlrBarChart = ({ data }) => {
    // Define chart data
    const chartData = {
        labels: ["Total", "Problematic", "Active"],
        datasets: [
            {
                data: data || [50, 40, 10], // Provide fallback for undefined data
            },
        ],
    };

    // Configuration options for the chart
    const chartConfig = {
        backgroundGradientFrom: "#f7f7f7",
        backgroundGradientTo: "#f7f7f7",
        color: (opacity = 1) => `rgba(71, 170, 255, ${opacity})`, // Customize bar color
        strokeWidth: 2,
        barPercentage: 0.8,
        useShadowColorFromDataset: false,
    };

    return (
        <View style={{  marginTop: 20 }}>
            {/* <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                DWLR Overview
            </Text> */}
            <BarChart
                data={chartData}
                width={screenWidth * 0.9} // Adjust to fit screen width
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                style={{
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default DwlrBarChart;
