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
import axios from "axios";

const ProblematicChartData = ({ dwlrData }) => {  // Receive dwlrData as a prop
    const [loading, setLoading] = useState(false);
    const [chartType, setChartType] = useState("pie");

    const screenWidth = Dimensions.get("window").width - 50;

    useEffect(() => {
        // We no longer need to fetch data here, dwlrData is passed down as a prop
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

    // Prepare the dataset for the charts
    const lowBattery = dwlrData?.lowBattery || 0;
    const anomalyDwlr = dwlrData?.anomalyDwlr || 0;
    // const problematicDwlr = (dwlrData?.lowBattery || 0) + (dwlrData?.anomalyDwlr || 0);

    const pieData = [
        {
            name: "Low Battery",
            population: lowBattery,
            color: "#E03F3F",
            legendFontColor: "#274C77",
            legendFontSize: 14,
        },
        {
            name: "Anomaly",
            population: anomalyDwlr,
            color: "#274C77",
            legendFontColor: "#274C77",
            legendFontSize: 14,
        },
    ];

    const barData = {
        labels: ["Low Battery", "Anomaly"],
        datasets: [
            {
                data: [lowBattery,anomalyDwlr ],
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(39, 76, 119, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(39, 76, 119, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={{ flex: 1, marginTop: 40 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                    }}
                >
                    <MaterialIcons name="donut-small" size={20} color={"white"} />
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
                    <MaterialIcons name="bar-chart" size={22} />
                    <Text style={{ color: chartType === "bar" ? "#FFF" : "#274C77" }}>
                        Bar Chart
                    </Text>
                </TouchableOpacity>
            </View>

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
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            )}
        </View>
    );
};

export default ProblematicChartData;
