import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LineChart } from "react-native-chart-kit";
import { PieChart } from "react-native-svg-charts";
import { BarChart } from "react-native-svg-charts";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


export default function Analytic() {

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
    'Kameron-Medium': require('../assets/fonts/Kameron/Kameron-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),

  });




  // const chartConfig = {
  //   // backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity: 0,
  //   // backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0.5,
  //   // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false // optional
  // };


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



      <ScrollView style={{ marginBottom: 71 }}>
        <View style={{
          flexDirection: 'row',
          marginVertical: 30,
          justifyContent: 'space-evenly'
        }}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 135,
              height: 44,
              borderWidth: 3,
              borderColor: '#274C77',
              borderStyle: 'solid',


            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>AI Sahayak</Text>
          </View>

          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 22,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 135,
              height: 44,
              borderWidth: 3,
              borderColor: '#274C77',
              borderStyle: 'solid',


            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>Training</Text>
          </View>
        </View>

        {/* 1st box  */}

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 30,
          height: 370,
          alignSelf: 'center',
          // justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>
          <ScrollView >
            {/* Text  */}


            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>

              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>Recent Water{'\n'} Level</Text>
              <Text style={{ paddingLeft: 110, fontFamily: 'Poppins-Regular', fontSize: 14 }}>March 2020</Text>
            </View>


            {/* chart chartConfig  */}
            <View>
              <LineChart
                data={{
                  labels: ["Jan", "Mar", "May", "July", "Sept", "Nov", "Dec"],
                  datasets: [
                    {
                      data: [
                        1, 3, 5, 7, 9
                      ]
                    }
                  ]
                }}
                width={screenWidth - 70} // from react-native
                height={220}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  // backgroundColor: "red",
                  backgroundGradientFrom: "#C5CAF3",
                  backgroundGradientTo: "#C5CAF3",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 259, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(24, 25, 25, ${opacity})`,
                  style: {
                    borderRadius: 16,

                  },
                  propsForDots: {
                    // r: "6",
                    strokeWidth: "2",
                    stroke: "#344BFD"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>

            {/* ProgressChart  */}
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30
            }}>
              <PieChart
                style={{ height: 170, width: 250 }}
                data={[
                  { key: 1, value: 45, svg: { fill: '#5A6ACF' } },
                  { key: 2, value: 30, svg: { fill: '#8593ED' } },
                  { key: 3, value: 20, svg: { fill: '#F4E2F7' } },
                ]}
                innerRadius="80%"
                outerRadius="100%"
              />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#274c77' }}>Present Month Data</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', }}>Highest Data{'\n'} 200000</Text>
                <Text style={{ paddingLeft: 110, fontFamily: 'Poppins-Regular', }}>Lowest Data{'\n'} 200000</Text>
              </View>

            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#274c77' }}>Previous Month Data</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', }}>Highest Data{'\n'} 200000</Text>
                <Text style={{ paddingLeft: 110, fontFamily: 'Poppins-Regular', }}>Lowest Data{'\n'} 200000</Text>
              </View>

            </View>

          </ScrollView>
        </View>

        {/* 2nd box  */}

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 30,
          alignSelf: 'center',
          alignItems: 'center',
          width: '90%',
          height: 370,
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>
          <ScrollView>
            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>

              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>Future Predicted{'\n'}Water Level</Text>
              <Text style={{ paddingLeft: 80, fontFamily: 'Poppins-Regular', fontSize: 14 }}>March 2020</Text>
            </View>


            {/* chart chartConfig  */}
            <View>
              <LineChart
                data={{
                  labels: ["Jan", "Mar", "May", "July", "Sept", "Nov", "Dec"],
                  datasets: [
                    {
                      data: [
                        1, 3, 5, 7, 9
                      ]
                    }
                  ]
                }}
                width={screenWidth - 70} // from react-native
                height={220}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  // backgroundColor: "red",
                  backgroundGradientFrom: "#C5CAF3",
                  backgroundGradientTo: "#C5CAF3",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 259, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(24, 25, 25, ${opacity})`,
                  style: {
                    borderRadius: 16,

                  },
                  propsForDots: {
                    // r: "6",
                    strokeWidth: "2",
                    stroke: "#344BFD"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>

            {/* ProgressChart  */}
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30
            }}>
              <PieChart
                style={{ height: 170, width: 250 }}
                data={[
                  { key: 1, value: 45, svg: { fill: '#5A6ACF' } },
                  { key: 2, value: 30, svg: { fill: '#8593ED' } },
                  { key: 3, value: 20, svg: { fill: '#F4E2F7' } },
                ]}
                innerRadius="80%"
                outerRadius="100%"
              />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#274c77' }}>Future Month Data</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Poppins-Regular', }}>Highest Data{'\n'} 200000</Text>
                <Text style={{ paddingLeft: 110, fontFamily: 'Poppins-Regular', }}>Lowest Data{'\n'} 200000</Text>
              </View>

            </View>
          </ScrollView>
        </View>

        {/* 3rd box battery prediction  */}

        
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 20,
          alignSelf: 'center',
          // alignItems: 'center',
          width: '90%',
          height: 370,
          maxWidth: 348,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 20,
        }}>

          <ScrollView  >
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 24, color: '#11263c' }}>Recent Battery {'\n'}Level</Text>
            <Text>Weekly Overview</Text>


            {/* Bar chart data */}
            <BarChart
              style={{ height: 180, width: screenWidth - 70 }}
              data={[50, 80, 40, 95, 85, 35, 70]}
              svg={{ fill: '#314CFF' }}
              contentInset={{ bottom: 5 }}
              // spacing={0.2}
              gridMin={0}
            />
            {/* Legends */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth - 85, }}>
              {['  Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <Text key={index} style={{ fontFamily: 'Poppins-Regular', fontSize: 12, textAlign: 'center' }}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Battery Status</Text>


              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Battery Alerts & Notifications</Text>

              <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 40 }}>Low Battery Warning:</Text>
              <Text>Date</Text>

              <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 40 }}>Overcharging Warning:</Text>
              <Text>Date</Text>
            </View>

          </ScrollView>

        </View>
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
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} >
          <Ionicons name="analytics" size={26} color="#0077cc" />
          <Text style={{ fontSize: 12, color: '#0077cc' }}>Analytics</Text>
        </TouchableOpacity>
      </View>


    </LinearGradient>
  )
}