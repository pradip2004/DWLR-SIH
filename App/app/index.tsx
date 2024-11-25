import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import { useWindowDimensions } from 'react-native';

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();


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
      <View
        style={{
          height: 60,
          width: '100%',

          flexDirection: "row",
          backgroundColor: 'white',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
        <Image
          source={require("../assets/images/image1.png")}
          style={{ height: 46, width: 99 }}
        />
        <Image
          source={require("../assets/images/image2.png")}
          style={{ height: 27, width: 45, marginLeft: 110 }}
        />
        <Image
          source={require("../assets/images/image3.png")}
          style={{ height: 30, width: 55, }}
        />
      </View>

      <View style={{ marginTop: 80, }}>
        {/* Name Section */}
        <MaskedView
          maskElement={
            <Text style={{ fontFamily: 'Kameron-SemiBold', fontSize: 35, textAlign: 'center' }}>
              DWLRS MONITOR
            </Text>
          }
        >
          <LinearGradient
            colors={['#274C77', '#488DDD']}
            locations={[0.08, 0.45]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 375, height: 150 }}
          />
        </MaskedView>

        {/* Description Section */}
        <Text
          style={{
            marginTop: -85, // Reduce margin to minimize space
            fontSize: 12,
            fontFamily: 'Kameron-SemiBold',
            color: '#274C77',
            textAlign: 'center',
            lineHeight: 18,
          }}
        >
          A software application for analysis of {'\n'}
          DWLR data and raise alarms in respect of {'\n'}
          anomalous values, faulty DWLRs etc.
        </Text>
      </View>

      {/* box section  */}
      <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
        {/* Background Image */}
        <Image
          source={require('../assets/images/image4.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
        />

        {/* Box Container */}
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
         
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          {/* Total DWLRS */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>14000</Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Kameron-SemiBold',
                color: '#fff',
                marginTop: 10,
              }}
            >
              Total DWLRS
            </Text>
          </View>

          {/* Separator Image */}
          <Image
            source={require('../assets/images/image5.png')}
            style={{ marginHorizontal: 15 }}
          />

          {/* Active DWLRS */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>14000</Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Kameron-SemiBold',
                color: '#fff',
                marginTop: 10,
              }}
            >
              Active
            </Text>
          </View>

          {/* Separator Image */}
          <Image
            source={require('../assets/images/image5.png')}
            style={{ marginHorizontal: 15 }}
          />

          {/* Problematic DWLRS */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>14000</Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Kameron-SemiBold',
                color: '#fff',
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              Problematic
            </Text>
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
            alignSelf: 'center',
            marginTop: 15,

          }}
        >
          <Text style={{ color: '#274c77', fontFamily: 'Kameron-SemiBold', fontSize: 15, textAlign: 'center' }}>LOGIN</Text>
        </View>
      </TouchableOpacity>

      <Image source={require("../assets/images/five.png")}
        style={{ marginLeft: -55, marginTop: -15, }}
      />



    </LinearGradient>
  );
}

