import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";

export default function DWLR() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState("All");
    const [cardData, setCardData] = useState([]);

    // Fetch data from API on component mount
    useEffect(() => {
        axios.get('http://192.168.146.24:8000/api/v1/dwlr/all')
            .then(response => setCardData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Filter cards based on selected option
    const filterCards = () => {
        switch (selectedOption) {
            case "Low Battery":
                return cardData.filter(card => card.lowBattery);
            case "Active":
                return cardData.filter(card => card.active);
            case "Abnormal Data":
                return cardData.filter(card => card.anomalyDwlr);
            case "No Data":
                return cardData.filter(card => !card.active && !card.lowBattery && !card.anomalyDwlr);
            case "All":
            default:
                return cardData;
        }
    };

    const filteredCards = filterCards();

    const handleOptionPress = (option) => setSelectedOption(option);

    const getBoxStyle = (option) => ({
        height: 35,
        width: 108,
        borderRadius: 6,
        marginLeft: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: selectedOption === option ? "#FED766" : "white",
    });

    return (
        <LinearGradient
            colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* Header */}
            <View style={{ height: 60, flexDirection: "row", backgroundColor: "white", paddingLeft: 15 }}>
                <Image source={require("../assets/images/image1.png")} style={{ height: 46, width: 99 }} />
                <Image source={require("../assets/images/image2.png")} style={{ height: 27, width: 45, left: 140, top: 8 }} />
                <Image source={require("../assets/images/image3.png")} style={{ height: 30, width: 55, left: 160, top: 8 }} />
            </View>

            {/* Filter Options */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", marginVertical: 20 }}>
                    {["All", "No Data", "Low Battery", "Abnormal Data", "Active"].map(option => (
                        <TouchableOpacity key={option} onPress={() => handleOptionPress(option)}>
                            <View style={getBoxStyle(option)}>
                                <Text style={{ fontSize: 11, color: "#5A6ACF", fontFamily: "Kameron-SemiBold" }}>{option}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Cards Section */}
            <ScrollView style={{ marginBottom: 75 }}>

                {filteredCards.map(card => (
                    <View
                        key={card._id}
                        style={{
                            backgroundColor: "#fff",
                            height: 496,
                            width: 355,
                            alignSelf: "center",
                            marginVertical: 10,
                            borderRadius: 15,
                            elevation: 4,
                            // paddingHorizontal: 25,
                            paddingTop: 15, // Added padding for better spacing
                        }}
                    >
                        {/* Status Label */}
                        <View
                            style={{
                                height: 35,
                                width: 105,
                                borderRadius: 20,
                                backgroundColor: card.lowBattery
                                    ? "#FF6262"
                                    : card.anomalyDwlr
                                        ? "#FFA500"
                                        : card.active
                                            ? "#A7F482"
                                            : "#B0BEC5",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "flex-end", // Align the label to the top-right
                                margin: 10,
                            }}
                        >
                            <Text style={{ fontFamily: "Kameron-SemiBold" }}>
                                {card.lowBattery
                                    ? "Low Battery"
                                    : card.anomalyDwlr
                                        ? "Abnormal"
                                        : card.active
                                            ? "Active"
                                            : "No Data"}
                            </Text>
                        </View>

                        {/* Centered Content */}
                        <View style={{ flex: 1, paddingHorizontal: 20 }}>
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontFamily: "Kameron-Regular",
                                    color: "#000",
                                    // textAlign: "center", // Center-align text
                                }}
                            >
                                DWLR ID: {'\n'}{card._id}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: "Kameron-SemiBold",
                                    color: "#000",
                                    // textAlign: "center",
                                    marginTop: 15,
                                }}
                            >
                                <Ionicons name="location" size={22} color={"#274c77"} />
                                {' '} {card.state} - {card.district}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: "Kameron-SemiBold",
                                    color: "#000",
                                    // textAlign: "center",
                                    marginTop: 15,

                                }}
                            >
                                Last Reported:{'\n'}
                                <Text style={{ color: '#64748b', lineHeight: 44 }}>
                                    {card.lastUpdatedInHours?.toFixed(2)} hours ago</Text>
                            </Text>

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: "Kameron-SemiBold",
                                    color: "#000",
                                    // textAlign: "center",

                                }}
                            >
                                Water Level:{'\n'}
                                <Text style={{ color: '#64748b', lineHeight: 44 }}>
                                    {card.latestWaterLevel} m</Text>
                            </Text>


                            <View style={{ flexDirection: "row",  alignItems: "center",justifyContent:'space-between' }}>
                                {/* Battery Section */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontFamily: "Kameron-SemiBold",
                                            color: "#000",
                                        }}
                                    >
                                        Battery:
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#64748b",
                                            lineHeight: 44,
                                            fontSize: 18,
                                            fontFamily: "Kameron-SemiBold",
                                        }}
                                    >
                                        {card.latestBatteryPercentage}%
                                    </Text>
                                </View>

                                {/* Button Section */}
                                <TouchableOpacity>
                                    <View
                                        style={{
                                            height: 40,
                                            width: 150,
                                            borderRadius: 20,
                                            backgroundColor: "#274c77",
                                            borderWidth: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            // marginLeft:-180,
                                            // marginTop:50
                                        }}
                                    >
                                        <Ionicons name="location" size={22} color="#fff" />
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontSize: 14,
                                                fontFamily: "Poppins-Medium",
                                            }}
                                        >
                                            {'  '}Get Location
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>



                        </View>

                        <Image source={require('../assets/images/six.png')} />

                    </View>
                ))}
            </ScrollView>


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

                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/report")}>
                    <MaterialIcons name="report-problem" size={26} color="#0077cc" />
                    <Text style={{ fontSize: 12, color: '#0077cc' }}>Report</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/alert")}>
                    <FontAwesome5 name="bell" size={24} color="#0077cc" />
                    <Text style={{ fontSize: 12, color: '#0077cc' }}>Alert</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={()=> router.push("/analytic")}>
                    <Ionicons name="analytics" size={26} color="#0077cc" />
                    <Text style={{ fontSize: 12, color: '#0077cc' }}>Analytics</Text>
                </TouchableOpacity>
            </View>


        </LinearGradient>
    );
}
