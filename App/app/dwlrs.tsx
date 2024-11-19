import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
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

            <ScrollView style={{ marginBottom: 8 }}>

                {/* State  */}
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <TouchableOpacity onPress={() => handleOptionPress("All")}>
                        <View style={getBoxStyle("All")}>

                            <Text style={{ fontSize: 11, fontFamily: 'Kameron-SemiBold', paddingVertical: 10, paddingLeft: 42, color: '#5A6ACF' }}>All</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleOptionPress("No Data")}>
                        <View style={getBoxStyle("No Data")}>

                            <Text
                                style={{
                                    fontSize: 11,
                                    fontFamily: 'Kameron-SemiBold',
                                    paddingVertical: 10, paddingLeft: 37,
                                    color: '#5A6ACF'
                                }}

                            > No Data
                            </Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => handleOptionPress("Abnormal Data")}>
                        <View style={getBoxStyle("Abnormal Data")}>

                            <Text style={{ fontSize: 11, fontFamily: 'Kameron-SemiBold', paddingVertical: 10, paddingLeft: 15, color: '#5A6ACF' }}>Abnormal Data</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                {/* 1st box  */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 363,
                    width: 360,
                    marginLeft: 20,

                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,
                    paddingLeft: 35,
                    paddingTop: 29
                }}>
                    <View style={{ height: 32, width: 82, borderRadius: 20, backgroundColor: '#A7F482', justifyContent: 'center', marginLeft: 185, marginBottom: 10 }}>
                        <Text style={{ paddingLeft: 25 }}>Active</Text>
                    </View>

                    <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>DWLR ID:222222</Text>

                    <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 25 }}>Last Reorted</Text>

                    <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Water Level</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Battery</Text>

                    <View></View>

                    <View style={{ left: -35, top: 17.6 }}>
                        <Image source={require('../assets/images/six.png')} style={{ position: 'relative' }} />
                        <Image source={require('../assets/images/seven.png')} style={{ position: 'absolute', top: 30 }} />
                    </View>

                    <TouchableOpacity>
                        <View style={{ height: 40, width: 131, borderRadius: 10, borderColor: '#274c77', borderWidth: 1, top: -80, left: 150, padding: 4, flexDirection: 'row', }}>
                            <MaterialIcons name="near-me" size={25} color="#274c77" />
                            <Text style={{ color: '#274c77', fontSize: 12, fontFamily: 'Poppins-Medium', left: -90, top: 5 }}>
                                Get Location
                            </Text>

                        </View>
                    </TouchableOpacity>
                </View>

                {/* 2nd box */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 363,
                    width: 360,
                    marginLeft: 20,
                    marginTop: 20,
                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,
                    paddingLeft: 35,
                    paddingTop: 29
                }}>
                    <View style={{ height: 32, width: 92, borderRadius: 20, backgroundColor: '#FED766', justifyContent: 'center', marginLeft: 185, marginBottom: 10 }}>
                        <Text style={{ paddingLeft: 25 }}>No Data</Text>
                    </View>

                    <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>DWLR ID:222222</Text>

                    <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 25 }}>Last Reorted</Text>

                    <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Water Level</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginTop: 20 }}>Battery</Text>



                    <View style={{ left: -35, top: 18 }}>
                        <Image source={require('../assets/images/six.png')} style={{ position: 'relative' }} />
                        <Image source={require('../assets/images/seven.png')} style={{ position: 'absolute', top: 30 }} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}