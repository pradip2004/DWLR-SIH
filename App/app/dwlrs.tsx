import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useFonts } from 'expo-font';


<MaterialIcons name="arrow-drop-down" size={24} color="black" />

export default function Dashboard() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),

    });

    // State to track selected option
    const [selectedOption, setSelectedOption] = useState("All");


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
        backgroundColor: selectedOption === option ? '#FED766' : 'white', // Highlight selected option
    });



    return (
        <LinearGradient
            colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
            locations={[0, 0.22, 28.5]} // Define color stops
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }} // Ensure gradient covers the whole screen
        >
            <View style={{ height: 60, width: '100%', paddingLeft: 15, flexDirection: "row", backgroundColor: 'white' }}>
                <Image
                    source={require("../assets/images/image1.png")}
                    style={{ height: 46, width: 99 }}
                />
                <Image
                    source={require("../assets/images/image2.png")}
                    style={{ height: 27, width: 45, left: 140, top: 8 }}
                />
                <Image
                    source={require("../assets/images/image3.png")}
                    style={{ height: 30, width: 55, left: 160, top: 8 }}
                />
            </View>

            <ScrollView style={{ marginBottom: 75 }}>

                {/* State  */}
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <TouchableOpacity onPress={() => handleOptionPress("All")}>
                        <View style={getBoxStyle("All")}>

                            <Text style={{ fontSize: 11, fontFamily: 'Kameron-SemiBold', paddingVertical: 10, color: '#5A6ACF' }}>All</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOptionPress("No Data")}>
                        <View style={getBoxStyle("No Data")}>
                            <Text style={{ fontSize: 11, fontFamily: 'Kameron-SemiBold', paddingVertical: 10, color: '#5A6ACF' }}>
                                No Data
                            </Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => handleOptionPress("Abnormal Data")}>
                        <View style={getBoxStyle("Abnormal Data")}>

                            <Text style={{ fontSize: 11, fontFamily: 'Kameron-SemiBold', paddingVertical: 10, color: '#5A6ACF' }}>Abnormal Data</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                {/* 1st box  */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 363,
                    width: 355,
                    alignSelf: 'center',
                    justifyContent: 'center',

                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,
                    
                    paddingTop: 29
                }}>
                    <View
                        style={{
                            height: 32,
                            width: 82,
                            display:'flex',
                            borderRadius: 20,
                            backgroundColor: '#A7F482',
                            justifyContent: 'center',
                            alignItems:'center',
                            paddingHorizontal:10,
                            marginLeft: 195, marginBottom: 10
                        }}>
                        <Text >Active</Text>
                    </View>
                    <View style={{ paddingLeft: 35,}}>
                        <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>DWLR ID:222222</Text>

                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 25 }}>Last Reorted</Text>

                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Water Level</Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20, }}>Battery</Text>

                    </View>

                        {/* Image Section  */}
                    <View 
                    style={{
                         justifyContent: 'flex-end', 
                         alignItems: 'flex-end',
                         bottom: -30, }}>
                        <Image source={require('../assets/images/six.png')} style={{ position: 'relative', }} />
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
                                left: 150, padding: 4,
                                flexDirection: 'row',
                            }}>
                            <MaterialIcons name="near-me" size={25} color="#274c77" />
                            <Text style={{ color: '#274c77', fontSize: 12, fontFamily: 'Poppins-Medium', top: 5 }}>
                                Get Location
                            </Text>

                        </View>
                    </TouchableOpacity>
                </View>

                {/* 2nd box */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 363,
                    width: 355,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop:20,
                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,
                    
                    paddingTop: 29
                }}>
                    <View
                        style={{
                            height: 32,
                            width: 90,
                            display:'flex',
                            borderRadius: 20,
                            backgroundColor: '#FED766',
                            justifyContent: 'center',
                            alignItems:'center',
                            paddingHorizontal:10,
                            marginLeft: 195, marginBottom: 10
                        }}>
                        <Text style={{fontFamily:'Kameron-Regular'}}>No Data</Text>
                    </View>
                    <View style={{ paddingLeft: 35,}}>
                        <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>DWLR ID:222222</Text>

                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 25 }}>Last Reorted</Text>

                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Water Level</Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20, }}>Battery</Text>

                    </View>

                        {/* Image Section  */}
                    <View 
                    style={{
                         justifyContent: 'flex-end', 
                         alignItems: 'flex-end',
                         bottom: -130, }}>
                        <Image source={require('../assets/images/six.png')} style={{ position: 'relative', }} />
                        <Image source={require('../assets/images/seven.png')} style={{ position: 'absolute', top: 30 }} />
                    </View>

                </View>
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

                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} >
                    <FontAwesome6 name="anchor-circle-check" size={24} color="#0077cc" />
                    <Text style={{ fontSize: 12, color: '#0077cc' }}>DWLR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => router.push("/Report")}>
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