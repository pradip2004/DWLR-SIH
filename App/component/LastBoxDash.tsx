import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    TextInput,
} from "react-native";

export default function LastBoxDash() {
    const [showList, setShowList] = useState(true); // State to toggle between list and form
    const users = [
        { _id: "1", email: "user1@example.com", phone: "123-456-7890" },
        { _id: "2", email: "user2@example.com", phone: "234-567-8901" },
        { _id: "3", email: "user3@example.com", phone: "345-678-9012" },
    ];

    // Function to toggle between list and form
    const handleToggleView = () => {
        setShowList(!showList);
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
            {/* Show List/Form Button */}
            <TouchableOpacity
                onPress={handleToggleView}
                style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: "#274C77",
                        fontSize: 18,
                        fontWeight: "700",
                        textAlign: "center",
                    }}
                >
                    {showList ? "Show Form" : "Show List"}
                </Text>
            </TouchableOpacity>

            {/* Conditionally render List or Form */}
            {showList ? (
                <ScrollView style={{ flex: 1, marginTop: 60 }}>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{
                            paddingBottom: 20,
                        }}
                        style={{ width: "100%" }}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 12,
                                    marginBottom: 10,
                                    backgroundColor: "#F4F4F4",
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: "#CCC",
                                }}
                            >
                                <Image
                                    source={{
                                        uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
                                    }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        marginRight: 15,
                                    }}
                                />
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "700",
                                            color: "#333",
                                        }}
                                    >
                                        {item.email}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: "#777",
                                        }}
                                    >
                                        {item.phone}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
            ) : (
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 60,
                    }}
                >
                    {/* Form Section */}
                    <View
                        style={{
                            width: "100%",
                            maxWidth: 340,
                            marginBottom: 15,
                        }}
                    >
                        {/* Email Input */}
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#274C77",
                                fontWeight: "600",
                                marginBottom: 8,
                            }}
                        >
                            Email
                        </Text>
                        <View
                            style={{
                                height: 60,
                                width: "100%",
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: "#CCC",
                                justifyContent: "center",
                                paddingHorizontal: 15,
                                backgroundColor: "#F0F0F0",
                                marginBottom: 12,
                            }}
                        >
                            <TextInput
                                style={{
                                    fontSize: 18,
                                    color: "#333",
                                    paddingLeft: 5,
                                    borderRadius: 12,
                                }}
                                placeholder="Enter your Gmail"
                                placeholderTextColor="#BBB"
                            />
                        </View>
                    </View>

                    {/* Mobile Number Input */}
                    <View
                        style={{
                            width: "100%",
                            maxWidth: 340,
                            marginBottom: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#274C77",
                                fontWeight: "600",
                                marginBottom: 8,
                            }}
                        >
                            Mobile Number
                        </Text>
                        <View
                            style={{
                                height: 60,
                                width: "100%",
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: "#CCC",
                                justifyContent: "center",
                                paddingHorizontal: 15,
                                backgroundColor: "#F0F0F0",
                                marginBottom: 20,
                            }}
                        >
                            <TextInput
                                style={{
                                    fontSize: 18,
                                    color: "#333",
                                    paddingLeft: 5,
                                    borderRadius: 12,
                                }}
                                placeholder="Enter your Mobile Number"
                                placeholderTextColor="#BBB"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={{
                            height: 60,
                            width: "100%",
                            maxWidth: 340,
                            borderRadius: 12,
                            backgroundColor: "#274C77",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 30,
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFF",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
}


// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     Dimensions,
//     TouchableOpacity,
//     ActivityIndicator,
// } from "react-native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { PieChart, BarChart } from "react-native-chart-kit";

// const PieChartComponent = ({ dwlrData }) => {
//     const [loading, setLoading] = useState(false);
//     const [chartType, setChartType] = useState("pie");

//     const screenWidth = Dimensions.get("window").width - 50;

//     useEffect(() => {
//         if (!dwlrData) {
//             setLoading(true);
//         } else {
//             setLoading(false);
//         }
//     }, [dwlrData]);

//     if (loading) {
//         return (
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     const activeDwlr = dwlrData?.active || 0;
//     const problematicDwlr = (dwlrData?.lowBattery || 0) + (dwlrData?.anomalyDwlr || 0);

//     const pieData = [
//         {
//             name: "Active",
//             population: activeDwlr,
//             color: "#3B9A9C", // Dark teal color for Active
//             legendFontColor: "#274C77",
//             legendFontSize: 14,
//         },
//         {
//             name: "Problematic",
//             population: problematicDwlr,
//             color: "#FF6F61", // Orange color for Problematic
//             legendFontColor: "#274C77",
//             legendFontSize: 14,
//         },
//     ];

//     const barData = {
//         labels: ["Active", "Problematic"],
//         datasets: [
//             {
//                 data: [activeDwlr, problematicDwlr],
//             },
//         ],
//     };

//     const chartConfig = {
//         backgroundGradientFrom: "#F5F5F5", // Changed background color here
//         backgroundGradientTo: "#F5F5F5",   // Changed background color here
//         decimalPlaces: 0,
//         color: (opacity = 1) => `rgba(39, 76, 119, ${opacity})`, // Adjusted main chart color to blue-gray
//         labelColor: (opacity = 1) => `rgba(39, 76, 119, ${opacity})`,
//         style: {
//             borderRadius: 16,
//         },
//     };

//     return (
//         <View style={{ flex: 1, marginTop: 40, alignItems: "center" }}>
//             {/* Toggle Buttons */}
//             <View style={{ flexDirection: "row", marginBottom: 20 }}>
//                 <TouchableOpacity
//                     onPress={() => setChartType("pie")}
//                     style={{
//                         backgroundColor: chartType === "pie" ? "#274C77" : "#FFF",
//                         borderColor: "#274C77",
//                         borderWidth: 1,
//                         borderRadius: 10,
//                         padding: 10,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         flexDirection: "row",
//                         marginRight: 10, // Space between buttons
//                     }}
//                 >
//                     <MaterialIcons
//                         name="donut-small"
//                         size={20}
//                         color={chartType === "pie" ? "white" : "#274C77"} // Correct icon color
//                     />
//                     <Text style={{ color: chartType === "pie" ? "#FFF" : "#274C77" }}>
//                         {"  "}Pie Chart
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => setChartType("bar")}
//                     style={{
//                         backgroundColor: chartType === "bar" ? "#274C77" : "#FFF",
//                         borderColor: "#274C77",
//                         borderWidth: 1,
//                         borderRadius: 10,
//                         padding: 10,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         flexDirection: "row",
//                     }}
//                 >
//                     <MaterialIcons
//                         name="bar-chart"
//                         size={22}
//                         color={chartType === "bar" ? "white" : "#274C77"} // Correct icon color
//                     />
//                     <Text style={{ color: chartType === "bar" ? "#FFF" : "#274C77" }}>
//                         {"  "}Bar Chart
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Chart Display */}
//             <View style={{ width: screenWidth + 50, alignItems: "center" }}>
//                 {chartType === "pie" ? (
//                     <PieChart
//                         data={pieData}
//                         width={screenWidth}
//                         height={220}
//                         chartConfig={chartConfig}
//                         accessor="population"
//                         backgroundColor="transparent"
//                         paddingLeft="15"
//                         absolute
//                     />
//                 ) : (
//                     <BarChart
//                         data={barData}
//                         width={screenWidth}
//                         height={200}
//                         chartConfig={chartConfig}
//                         fromZero
//                         showValuesOnTopOfBars
//                         verticalLabelRotation={0}
//                     />
//                 )}
//             </View>
//         </View>
//     );
// };

// export default PieChartComponent;
