import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PieChart, BarChart } from "react-native-chart-kit";

const PieChartComponent = ({ dwlrData }) => {
    const [loading, setLoading] = useState(false);
    const [chartType, setChartType] = useState("pie");

    const screenWidth = Dimensions.get("window").width - 50;

    useEffect(() => {
        if (!dwlrData) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [dwlrData]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const activeDwlr = dwlrData?.active || 0;
    const problematicDwlr = (dwlrData?.lowBattery || 0) + (dwlrData?.anomalyDwlr || 0);

    const pieData = [
        {
            name: "Active",
            population: activeDwlr,
            color: "#3B9A9C", // Dark teal color for Active
            legendFontColor: "#274C77",
            legendFontSize: 14,
        },
        {
            name: "Problematic",
            population: problematicDwlr,
            color: "#FF6F61", // Orange color for Problematic
            legendFontColor: "#274C77",
            legendFontSize: 14,
        },
    ];

    const barData = {
        labels: ["Active", "Problematic"],
        datasets: [
            {
                data: [activeDwlr, problematicDwlr],
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(39, 76, 119, ${opacity})`, // Adjusted main chart color to blue-gray
        labelColor: (opacity = 1) => `rgba(39, 76, 119, ${opacity})`,
        fillShadowGradient: "#274C77", // Adding shadow gradient color to the bars
        fillShadowGradientOpacity: 1,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={{ flex: 1, marginTop: 40, alignItems: "center" }}>
            {/* Toggle Buttons */}
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <TouchableOpacity
                    onPress={() => setChartType("pie")}
                    style={{
                        backgroundColor: chartType === "pie" ? "#274C77" : "#FFF",
                        borderColor: "#274C77",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginRight: 10, // Space between buttons
                    }}
                >
                    <MaterialIcons
                        name="donut-small"
                        size={20}
                        color={chartType === "pie" ? "white" : "#274C77"} // Correct icon color
                    />
                    <Text style={{ color: chartType === "pie" ? "#FFF" : "#274C77" }}>
                        {"  "}Pie Chart
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setChartType("bar")}
                    style={{
                        backgroundColor: chartType === "bar" ? "#274C77" : "#FFF",
                        borderColor: "#274C77",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <MaterialIcons
                        name="bar-chart"
                        size={22}
                        color={chartType === "bar" ? "white" : "#274C77"} // Correct icon color
                    />
                    <Text style={{ color: chartType === "bar" ? "#FFF" : "#274C77" }}>
                        {"  "}Bar Chart
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Chart Display */}
            <View style={{ width: screenWidth + 50, alignItems: "center" }}>
                {chartType === "pie" ? (
                    <PieChart
                        data={pieData}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                ) : (
                    <BarChart
                        data={barData}
                        width={screenWidth}
                        height={200}
                        chartConfig={{
                            ...chartConfig,
                            barColors: ['#8bc34a', '#e53935'], // Custom bar colors (light green and dark red)
                        }}
                        fromZero
                        showValuesOnTopOfBars
                        verticalLabelRotation={0}
                    />
                )}
            </View>
        </View>
    );
};

export default PieChartComponent;
