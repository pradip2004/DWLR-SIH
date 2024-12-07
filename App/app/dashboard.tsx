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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

import Piechart from "../component/piechart"
import SecondBox from "../component/DwlrBox"

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
    const [dwlrData, setDwlrData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get("http://192.168.146.24:8000/api/v1/dwlr/states");
            setStates(response.data.states);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchDistricts = async (state) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://192.168.146.24:8000/api/v1/dwlr/districts?state=${state}`);
            setDistricts(response.data.districts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching districts:", error);
            setLoading(false);
        }
    };

    const fetchDwlrData = async (queryKey, queryValue) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://192.168.146.24:8000/api/v1/dwlr/info?${queryKey}=${queryValue}`);
            setDwlrData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching DWLR data:", error);
            setLoading(false);
        }
    };

    const handleSelect = (type, value) => {
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
            <View
                style={{
                    height: 60,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    backgroundColor: "#fff",
                }}
            >
                <Image source={require("../assets/images/image1.png")} style={{ height: 40, width: 100 }} />
                <Image source={require("../assets/images/image2.png")} style={{ height: 30, width: 50 }} />
                <Image source={require("../assets/images/image3.png")} style={{ height: 30, width: 50 }} />
            </View>

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

                {/* 1dt box  */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 280,
                    width: 356,

                    alignSelf: 'center',
                    justifyContent: 'center',
                    // alignItems: 'center',
                    paddingLeft: 30,
                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,

                }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
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
                                <Text style={{ color: "#274C77", fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 40, top: -16 }}>{dwlrData.problematic || 0}</Text>
                            </View>


                        </>
                    )}
                </View>

                {/* 2nd box */}
                {/* Second Box */}
                <SecondBox>

                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#274C77', marginBottom: 10 }}>
                        {selectedState || "State Name"}
                    </Text>

                    <Text style={{ fontSize: 22, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                        {selectedDistrict || "City Name"}
                    </Text>
                    <Piechart/>
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
                    <Piechart/>
                    </SecondBox>

            </ScrollView>

            {/* Dropdown Modals */}
            {dropdownType === "state" && <Dropdown type="state" data={states} />}
            {dropdownType === "district" && <Dropdown type="district" data={districts} />}






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
                <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} >
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
