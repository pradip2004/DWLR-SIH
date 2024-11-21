import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';


export default function Index() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Kameron-SemiBold': require('../assets/fonts/Kameron/Kameron-SemiBold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),

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
      <View>

        {/* name section  */}
        <Text style={{ fontSize: 55, marginLeft: 60, marginTop: 75 }}>APP NAME</Text>

        <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#274C77', textAlign: 'center', marginVertical: 5, marginHorizontal: 60 }}>
          A software application for analysis of {'\n'} DWLR data and raise alarms in respect of {'\n'}anomalous values, faulty DWLRs etc
        </Text>

        {/* box section  */}
        <View style={{ marginTop: 20, left: 45, }}>
          <Image source={require('../assets/images/image4.png')} />
          <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 15, marginLeft: 20 }}>
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: 24, color: '#fff', }}>14000</Text>
              <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 15, }}>Total DWLRS</Text>
            </View>

            <Image source={require('../assets/images/image5.png')} style={{ top: -13, marginHorizontal: 15 }} />
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: 24, color: '#fff', }}>14000</Text>
              <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 15, }}>Active</Text>
            </View>

            <Image source={require('../assets/images/image5.png')} style={{ top: -13, marginHorizontal: 15 }} />
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: 24, color: '#fff', }}>14000</Text>
              <Text style={{ fontSize: 12, fontFamily: 'Kameron-SemiBold', color: '#fff', marginTop: 15, }}>Problematic</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <View
            style={{
              width: 122,
              height: 42,
              borderRadius: 22,
              backgroundColor: '#DEFFFC',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              left: 145
            }}
          >
            <Text style={{ color: '#274c77', fontFamily: 'Kameron-SemiBold', fontSize: 15 }}>LOGIN</Text>
          </View>
        </TouchableOpacity>

        <Image source={require("../assets/images/five.png")}
          style={{ marginLeft: -55, marginTop: -15, }}
        />
      </View>

    
    </LinearGradient>
  );
}