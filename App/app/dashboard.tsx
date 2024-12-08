import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Modal,
    Pressable,
    ActivityIndicator,
    Dimensions,
    TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BarChart } from "react-native-chart-kit";

import { useFonts } from "expo-font";
import { useRouter } from "expo-router";


import SecondBox from "../component/DashboardBox";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import PieChartComponent from "../component/pieChartComponent";
import ProblematicChartData from "@/component/problematicChartData";
// import DwlrBarChart from "@/component/DwlrBarChart";

export default function Dashboard() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        "Kameron-SemiBold": require("../assets/fonts/Kameron/Kameron-SemiBold.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [dropdownType, setDropdownType] = useState(null);
    const [dwlrData, setDwlrData] = useState([]);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        fetchStates();
        // Fetch data for the initial default state
        fetchDwlrData("default", "default",);
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get("http://192.168.56.24:8000/api/v1/dwlr/states");
            setStates(response.data.states);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchDistricts = async (state: any) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://192.168.56.24:8000/api/v1/dwlr/districts?state=${state}`);
            setDistricts(response.data.districts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching districts:", error);
            setLoading(false);
        }
    };

    const fetchDwlrData = async (queryKey: string, queryValue: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://192.168.56.24:8000/api/v1/dwlr/info?${queryKey}=${queryValue}`);
            console.log("DWLR Data Response:", response.data); // Debugging log
            setDwlrData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching DWLR data:", error);
            setLoading(false);
        }
    };
    // Ensure that 'dwlrData' contains 'anomalyDwlr' and 'lowbattery'
    const ProblematicDwlr = (dwlrData.anomalyDwlr || 0) + (dwlrData.lowBattery || 0);


    const handleSelect = (type: string, value: React.SetStateAction<null>) => {
        if (type === "state") {
            setSelectedState(value);
            setSelectedDistrict(null);
            fetchDistricts(value);
            fetchDwlrData("state", value);
        } else if (type === "district") {
            setSelectedDistrict(value);
            fetchDwlrData("district", value);
        }
        setDropdownType(null);
    };

    const Dropdown = ({ type, data }) => (
        <Modal transparent={true} animationType="slide" visible={dropdownType === type}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <View
                    style={{
                        width: "80%",
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 20,
                        maxHeight: "60%",
                    }}
                >
                    <Text style={{ fontSize: 18, fontFamily: "Kameron-SemiBold", marginBottom: 10 }}>
                        Select {type === "state" ? "State" : "District"}
                    </Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                style={{
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ddd",
                                }}
                                onPress={() => handleSelect(type, item)}
                            >
                                <Text style={{ fontSize: 16 }}>{item}</Text>
                            </Pressable>
                        )}
                    />
                    <TouchableOpacity onPress={() => setDropdownType(null)}>
                        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    if (!fontsLoaded) return <ActivityIndicator size="large" color="#0000ff" />;

 
    return (
        <LinearGradient
            colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* Header */}
            <Header />

            {/* Dropdowns */}
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 20 }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: "#274C77",
                        borderRadius: 8,
                    }}
                    onPress={() => setDropdownType("state")}
                >
                    <Ionicons name="location" size={20} color="white" />
                    <Text style={{ color: "white", marginLeft: 10 }}>
                        {selectedState || "Select State"}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: selectedState ? "#274C77" : "#aaa",
                        borderRadius: 8,
                    }}
                    onPress={() => selectedState && setDropdownType("district")}
                    disabled={!selectedState}
                >
                    <MaterialIcons name="location-city" size={20} color="white" />
                    <Text style={{ color: "white", marginLeft: 10 }}>
                        {selectedDistrict || "Select District"}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 71 }}>


                {/* 1st box */}
                <View
                    style={{
                        backgroundColor: "#fff",
                        height: 550,
                        width: 356,
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingLeft: 30,
                        borderRadius: 15,
                        elevation: 4,
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2.41,
                    }}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#000' }}>TOTAL DWLRs :</Text>
                                    <Text style={{ color: "#274C77", fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 55, top: -16 }}>{dwlrData.total || 0}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#000' }}>ACTIVE DWLRs :</Text>
                                    <Text style={{ color: "#274C77", fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 55, top: -16 }}> {dwlrData.active || 0}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#000' }}>PROBLEMATIC DWLR:</Text>
                                    <Text style={{ color: "#274C77", fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 10, top: -16 }}> {ProblematicDwlr || 0}</Text>
                                </View>
                            </View>


                            {/* Bar section  */}
                            <BarChart
                                data={{
                                    labels: ["Total", "Active", "Problematic"],
                                    datasets: [
                                        {
                                            data: [
                                                dwlrData.total || 0,
                                                dwlrData.active || 0,
                                                (dwlrData.anomalyDwlr || 0) + (dwlrData.lowBattery || 0),
                                            ],
                                            colors: [
                                                (opacity = 1) => `rgba(110, 206,255, ${opacity})`, // Red for Total
                                                (opacity = 1) => `rgba(249, 43, 91, ${opacity})`, // Blue for Active
                                                (opacity = 1) => `rgba(252, 243,123, ${opacity})`, // Green for Problematic
                                            ],
                                        },
                                    ],
                                }}
                                width={Dimensions.get("window").width - 70}
                                height={220}
                                yAxisLabel=""
                                chartConfig={{
                                    backgroundGradientFrom: "#FFF",
                                    backgroundGradientTo: "#FFF",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis label color
                                    barPercentage: 1.5,
                                }}
                                style={{
                                    marginVertical: 20,
                                    borderRadius: 10,
                                }}
                                withCustomBarColorFromData={true} // Enable custom color for bars
                                flatColor={true} // Optional: Enable flat color

                            />

                        </>
                    )}
                </View>
                {/* Second Box */}
                <SecondBox>

                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#274C77', marginBottom: 10 }}>
                        {selectedState || "State Name"}
                    </Text>

                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                        {selectedDistrict || "City Name"}
                    </Text>
                    <PieChartComponent dwlrData={dwlrData} />
                </SecondBox>

                {/* Third box */}
                <SecondBox>
                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#274C77', marginBottom: 10 }}>
                        {selectedState || "State Name"}
                    </Text>

                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                        {selectedDistrict || "City Name"}
                    </Text>

                    {/* chart section  */}
                    {/* Inside your Dashboard component, pass dwlrData to PieChartComponent */}
                    <ProblematicChartData dwlrData={dwlrData} />

                </SecondBox>

                    {/* Fourth box  */}
                    <SecondBox>
                        
                    </SecondBox>

                    {/* fifth box  */}
                <SecondBox>
                    <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
                        <Text style={{  fontSize: 20, color: '#274c77', }}>Email</Text>
                        <View
                            style={{
                                height: 60, width: 280,
                                borderRadius: 10, borderWidth: 1, borderColor: 'gray',
                                justifyContent: 'center', padding: 5, marginTop: 10
                            }}>
                            <TextInput
                                style={{ fontSize:18 }}
                                placeholder="Enter your gmail"
                            />
                        </View>

                        {/* mobile number  */}

                        <Text style={{ marginTop: 20, fontSize: 20, color: '#274c77', }}>Mobile Number</Text>
                        <View
                            style={{
                                height: 60, width: 280,
                                borderRadius: 10, borderWidth: 1, borderColor: 'gray',
                                justifyContent: 'center', padding: 10, marginTop: 10
                            }}>
                            <TextInput
                                style={{ fontSize:18 }}
                                placeholder="Enter your Mobile Number"
                                keyboardType="phone-pad"
                                
                            />
                        </View>

                        {/* Button  */}
                        <TouchableOpacity 
                        style={{
                            height: 60, width: 280,
                            borderRadius: 10, backgroundColor:'#274c77',
                            justifyContent:'center',
                            marginTop:40,alignSelf:'center'
                        }}>
                            <Text style={{color:'#fff',textAlign:'center',fontSize:24,fontWeight:'bold'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </SecondBox>



            </ScrollView>
            {/* Dropdown Modals */}
            {dropdownType === "state" && <Dropdown type="state" data={states} />}
            {dropdownType === "district" && <Dropdown type="district" data={districts} />}

            {/* Footer  */}
            <Footer />
        </LinearGradient>
    );
};