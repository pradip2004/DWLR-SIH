import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart } from "react-native-svg-charts";
import { useRouter } from "expo-router";
// import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


<MaterialIcons name="arrow-drop-down" size={24} color="black" />

export default function Dashboard() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
        // Add more fonts as needed
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

            <ScrollView>
                {/* State  */}
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <TouchableOpacity>
                        <View style={{ height: 40, width: 115, backgroundColor: 'white', marginLeft: 10, flexDirection: 'row' }}>

                            <Text style={{ fontSize: 10, fontFamily: 'Kameron-SemiBold', paddingVertical: 12, paddingLeft: 9 }}>SELECT STATE</Text>
                            <MaterialIcons name="arrow-drop-down" size={28} color="black" style={{ paddingVertical: 4 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ height: 40, width: 120, backgroundColor: 'white', marginLeft: 10, flexDirection: 'row' }}>

                            <Text style={{ fontSize: 10, fontFamily: 'Kameron-SemiBold', paddingVertical: 12, paddingLeft: 7 }}>SELECT DISTRICT</Text>
                            <MaterialIcons name="arrow-drop-down" size={28} color="black" style={{ paddingVertical: 4 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ height: 40, width: 115, backgroundColor: 'white', marginLeft: 10, flexDirection: 'row' }}>

                            <Text style={{ fontSize: 10, fontFamily: 'Kameron-SemiBold', paddingVertical: 12, paddingLeft: 9 }}>SELECT CITY</Text>
                            <MaterialIcons name="arrow-drop-down" size={28} color="black" style={{ paddingVertical: 4 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 1dt box  */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 309,
                    width: 356,
                    marginLeft: 20,

                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,
                    paddingLeft: 30,
                    paddingTop: 29
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000' }}>TOTAL DWLRs</Text>
                        <Text style={{ color: 'black', fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 55, top: -16 }}>200</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000' }}>ACTIVE DWLRs</Text>
                        <Text style={{ color: 'black', fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 55, top: -16 }}>545</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000' }}>PROBLEMATIC DWLR</Text>
                        <Text style={{ color: 'black', fontFamily: 'Kameron-SemiBold', fontSize: 42, marginBottom: 15, left: 40, top: -16 }}>5</Text>
                    </View>

                    <View style={{ left: -35, top: -17.6 }}>
                        <Image source={require('../assets/images/six.png')} style={{ position: 'relative' }} />
                        <Image source={require('../assets/images/seven.png')} style={{ position: 'absolute', top: 30 }} />
                    </View>
                </View>

                {/* 2nd box */}
                <View style={{
                    backgroundColor: '#fff',
                    height: 309,
                    width: 356,
                    marginLeft: 20,
                    marginTop: 10,
                    borderRadius: 15,
                    elevation: 4,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.41,
                    paddingLeft: 40,
                    paddingTop: 25
                }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>State Name</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: 'gray', marginTop: 20 }}>City Name</Text>

                    <TouchableOpacity onPress={() => router.push("dwlrs")}>
                        <View style={{
                            height: 35,
                            width: 106,
                            justifyContent: 'center',
                            paddingLeft: 12,
                            borderRadius: 10,
                            borderColor: 'gray',
                            borderWidth: 0.2,
                            left: 180,
                            top: -45
                        }}
                        >
                            <Text style={{ color: '#5A6ACF', fontFamily: 'Poppins-Medium' }}>View Report</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Pie chart section */}
                    {/* <PieChart
                        style={{ height: 170, width: 290, top: -40 }}
                        data={[
                            { key: 1, value: 45, svg: { fill: '#5A6ACF' } },
                            { key: 2, value: 30, svg: { fill: '#8593ED' } },
                            { key: 3, value: 20, svg: { fill: '#FF81C5' } },
                        ]}
                        innerRadius={'70%'}
                        outerRadius={'100%'}
                        padAngle={0}
                    />
                    <View style={{ marginTop: -16, flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: '#5A6ACF', marginRight: 6 }} />
                            <Text style={{ fontSize: 14, color: '#000', marginRight: 15 }}>Active</Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <View style={{  width: 15, height: 15, borderRadius: 50, backgroundColor: '#8593ED', marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: '#000', marginRight: 15 }}>Others</Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <View style={{  width: 15, height: 15, borderRadius: 50, backgroundColor: '#FF81C5', marginRight: 10 }} />
                            <Text style={{ fontSize: 14, color: '#000' }}>Problematic</Text>
                        </View>
                    </View> */}
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
        <TouchableOpacity style={{alignItems: 'center', marginTop: 15 }}>
          <MaterialCommunityIcons name="view-dashboard-outline" size={26} color="#0077cc" />
          <Text style={{fontSize: 12, color: '#0077cc' }}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center', marginTop: 15 }} onPress={() => router.push("dwlrs")}>
          <FontAwesome6 name="anchor-circle-check" size={24} color="#0077cc" />
          <Text style={{fontSize: 12, color: '#0077cc' }}>DWLR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center', marginTop: 15 }}  onPress={() => router.push("report")}>
          <MaterialIcons name="report-problem" size={26} color="#0077cc" />
          <Text style={{fontSize: 12, color: '#0077cc' }}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center', marginTop: 15 }} onPress={() => router.push("alert")}>
          <FontAwesome5 name="bell" size={24} color="#0077cc" />
          <Text style={{fontSize: 12, color: '#0077cc' }}>Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', marginTop: 15 }} onPress={() => router.push("analytic")}>
          <Ionicons name="analytics" size={26} color="#0077cc" />
          <Text style={{fontSize: 12, color: '#0077cc' }}>Analytics</Text>
        </TouchableOpacity>
      </View>

        </LinearGradient>
    );
}