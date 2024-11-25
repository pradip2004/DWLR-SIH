import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';

export default function Dashboard() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
        'Kameron-Medium': require('../assets/fonts/Kameron/Kameron-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),

    });



    const [selectedOption, setSelectedOption] = useState("All");

    // Sample card data
    const cardData = [
        { id: 1, status: "Active", color: "#A7F482", },
        { id: 2, status: "No Data", color: "#FED766" },
        { id: 3, status: "Low Battery", color: "#FF6262" },
        { id: 4, status: "Abnormal Data", color: "#FED766" },
    ];

    // Dynamically reorder cards based on selected option
    const reorderedCards = selectedOption === "All"
        ? cardData
        : cardData
            .filter(card => card.status === selectedOption) // Bring matching cards to the top
            .concat(cardData.filter(card => card.status !== selectedOption)); // Append other cards

    const handleOptionPress = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
    };

    const getBoxStyle = (option: string) => ({
        height: 35,
        width: 108,
        borderRadius: 6,
        marginLeft: 18,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: selectedOption === option ? '#FED766' : 'white',
    });

    return (
        <LinearGradient
            colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* Header */}
            <View style={{ height: 60, flexDirection: "row", backgroundColor: 'white', paddingLeft: 15 }}>
                <Image source={require("../assets/images/image1.png")} style={{ height: 46, width: 99 }} />
                <Image source={require("../assets/images/image2.png")} style={{ height: 27, width: 45, left: 140, top: 8 }} />
                <Image source={require("../assets/images/image3.png")} style={{ height: 30, width: 55, left: 160, top: 8 }} />
            </View>

            {/* Filter Options */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    {["All", "No Data", "Low Battery", "Abnormal Data"].map(option => (
                        <TouchableOpacity key={option} onPress={() => handleOptionPress(option)}>
                            <View style={getBoxStyle(option)}>
                                <Text style={{ fontSize: 11, color: '#5A6ACF', fontFamily: 'Kameron-SemiBold' }}>{option}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Cards Section */}
            <ScrollView style={{ marginBottom: 75 }}>
                {reorderedCards.map((card, index) => (
                    <View
                        key={card.id}
                        style={{
                            backgroundColor: '#fff',
                            height: 363,
                            width: 355,
                            alignSelf: 'center',
                            marginVertical: 10,
                            borderRadius: 15,
                            elevation: 4,
                            paddingTop: 29,
                        }}
                    >
                        <View
                            style={{
                                height: 35,
                                width: 125,
                                borderRadius: 20,
                                backgroundColor: card.color,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 195,
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ fontFamily: 'Kameron-SemiBold' }}>{card.status}</Text>
                        </View>
                        <View style={{ paddingLeft: 35 }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>DWLR ID: 222222</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 25 }}>Last Reported</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Water Level</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Battery</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', bottom: -15 }}>
                            <Image source={require('../assets/images/six.png')} style={{ position: 'relative' }} />
                            <Image source={require('../assets/images/seven.png')} style={{ position: 'absolute', top: 30 }} />
                        </View>

                        <TouchableOpacity>
                            <View
                                style={{
                                    height: 40,
                                    width: 131,
                                    borderRadius: 10,
                                    borderColor: '#274c77',
                                    borderWidth: 1, top: -80,
                                    left: 180, padding: 4,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons name="near-me" size={25} color="#274c77" />
                                <Text style={{ color: '#274c77', fontSize: 12, fontFamily: 'Poppins-Medium', top: 5 }}>
                                    Get Location
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

             {/* Footer Navigation */}
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

                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/analytic")}>
                    <Ionicons name="analytics" size={26} color="#0077cc" />
                    <Text style={{ fontSize: 12, color: '#0077cc' }}>Analytics</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
