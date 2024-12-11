import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import { useRouter } from "expo-router";
import Footer from '@/component/Footer';
import axios from 'axios'; // Make sure to import axios
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Header from '@/component/Header';

export default function Alert() {
  const router = useRouter();

  const [problematicDwlrs, setProblematicDwlrs] = useState([]); // State to store DWLR data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch problematic DWLRs from the backend API
  const fetchProblematicDwlrs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://10.150.21.189:8000/api/v1/dwlr/coordinates-info'); // Backend API URL
      setProblematicDwlrs(response.data); // Set problematic DWLRs data
    } catch (err) {
      setError('Failed to load problematic DWLRs.');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchProblematicDwlrs();
  }, []);

  const openGoogleMaps = () => {
    const latitude = 37.7749; // Example: Latitude of San Francisco
    const longitude = -122.4194; // Example: Longitude of San Francisco
    const label = "Your Destination";

    // Google Maps URL
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${label}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps", err)
    );
  };

  return (
    <LinearGradient
      colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
      locations={[0, 0.22, 28.5]} // Define color stops
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* Header with Images */}
      <Header/>

      <View contentContainerStyle={styles.scrollContent}>
        <View style={styles.container2}>
          {/* Main ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>PROBLEMETIC DWLRs</Text>

            {/* Show Loading Spinner while fetching data */}
            {loading && <ActivityIndicator size="large" color="#0077cc" />}

            {/* Show Error Message if fetching fails */}
            {error && <Text style={styles.error}>{error}</Text>}

            {/* Render List of Problematic DWLRs */}
            {!loading && !error && problematicDwlrs.length > 0 && (
              <ScrollView style={styles.innerScrollContainer}>
                {problematicDwlrs.map((item, index) => (
                  <View key={index} style={styles.notificationCard}>
                    <FontAwesome5 name="bell" size={26} color="orange" />

                    <View style={styles.textContainer}>
                      <Text style={styles.titleText}>DWLR ID: {item.id}</Text>
                      <Text style={styles.subtitleText}>{item.anomalyDwlr ? 'Anomaly Detected' : 'No Anomaly'}</Text>
                      <Text style={styles.descriptionText}>{item.lowBattery ? 'Low Battery' : 'Battery OK'}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={[styles.downloadButton, { marginBottom: 10 }]}>
                        <Text style={styles.downloadButtonText}>Details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.downloadButton}>
                        <Text style={styles.downloadButtonText}>Hide</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Map Section */}
      <TouchableOpacity style={styles.mapcontainer} onPress={openGoogleMaps}>
        <Text style={styles.mapText}>Click to Open Map</Text>
      </TouchableOpacity>

      {/* Footer Navigation */}
      <Footer/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(28),
    fontFamily: 'Kameron-SemiBold',
    marginTop: moderateScale(1),
    marginLeft: moderateScale(19),
  },
  container: { flex: 1 },
  gradient: { flex: 1 },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: verticalScale(55),
    backgroundColor: 'white',
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
},
  headerImage: { height: moderateScale(46), width: moderateScale(99), resizeMode: 'contain' },
  header1Image: { height: moderateScale(27), width: moderateScale(45), marginLeft: moderateScale(105) },
  header2Image: { height: moderateScale(27), width: moderateScale(45) },
  scrollContent: { paddingHorizontal: moderateScale(30) },
  input: { flex: 1, paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(10), fontSize: moderateScale(16) },
  icon: { marginLeft: moderateScale(10) },
  buttonText: {
    color: '#5A6ACF',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  midContainer: {
    height: moderateScale(200),
    width: moderateScale(318),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  midContainerText: {
    fontSize: moderateScale(50),
    fontWeight: '900',
    textAlign: 'center',
    color: '#274C77',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    height: moderateScale(70),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(-2) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
  },
  footerIcon: { alignItems: 'center', marginTop: moderateScale(15) },
  iconLabel: { fontSize: moderateScale(12), color: '#0077cc' },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: moderateScale(250),
    borderRadius: moderateScale(30),
    paddingTop: moderateScale(80),
  },
  innerScrollContainer: {
    backgroundColor: '#fff',
    height: moderateScale(328),
    width: moderateScale(322),
    alignSelf: 'center',
    marginTop: moderateScale(10),
    borderRadius: moderateScale(25),
    elevation: 10,
    shadowOffset: { width: moderateScale(4), height: moderateScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2.41),
    padding: moderateScale(20),
  },
  notificationCard: {
    backgroundColor: '#fff',
    height: moderateScale(90),
    width: '100%',
    borderRadius: moderateScale(15),
    marginTop: moderateScale(5),
    elevation: 10,
    shadowOffset: { width: moderateScale(8), height: moderateScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2.41),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  titleText: {
    fontSize: moderateScale(16),
    color: 'black',
    fontFamily: 'Kameron-SemiBold',
    marginBottom: moderateScale(5),
  },
  subtitleText: {
    fontSize: moderateScale(10),
    color: '#4e4e4e',
    fontFamily: 'Kameron-SemiBold',
  },
  descriptionText: {
    fontSize: moderateScale(10),
    color: '#4e4e4e',
    fontFamily: 'Kameron-SemiBold',
  },
  notificationImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
    marginLeft: moderateScale(10),
  },
  downloadButton: {
    backgroundColor: '#274c77',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(75),
    height: moderateScale(35),
    marginLeft: moderateScale(10),
  },
  downloadButtonText: {
    color: 'white',
    fontSize: moderateScale(14),
  },
  mapcontainer: {
    height: moderateScale(185),
    width: moderateScale(322),
    backgroundColor: 'white',
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    padding: moderateScale(20),
    marginTop: moderateScale(-240),
    alignSelf: 'center',
    marginBottom: moderateScale(155),
  },
  mapText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#274c77',
  },
  error: { 
    color: 'red', 
    textAlign: 'center', 
    marginTop: moderateScale(20) 
  },
});
