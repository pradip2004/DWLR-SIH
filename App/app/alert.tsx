import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import Footer from '@/component/Footer';

export default function Alert() {

  const router = useRouter();

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
    style={{ flex: 1 }}
    >
      <View style={styles.container}></View>

      {/* Header with Images */}
      <View style={styles.nav}>
        <Image source={require('./../assets/images/image 7.png')} style={styles.headerImage} />
        <Image source={require('./../assets/images/image 7 (1).png')} style={styles.header1Image} />
        <Image source={require('./../assets/images/image 7 (2).png')} style={styles.header2Image} />
      </View>

      {/* ScrollView for Form Content */}
      <View contentContainerStyle={styles.scrollContent}>


        <View style={styles.container2}>
          {/* Main ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>


            <ScrollView style={styles.innerScrollContainer}>
              <Text style={{
                fontSize: 26,
                fontWeight: 'bold',
              }}>Download Data</Text>
              {/* Notification Items */}
              {[...Array(14)].map((_, index) => (
                <View key={index} style={styles.notificationCard}>
                  <FontAwesome name="bell" size={26} color="orange" />

                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>DWLRs ID</Text>
                    <Text style={styles.subtitleText}>Problem</Text>
                    <Text style={styles.descriptionText}>Explain in one line</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Text style={styles.downloadButtonText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Text style={styles.downloadButtonText}>Hide</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

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
  container: { flex: 1, },
  gradient: { flex: 1 },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'white',
  
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerImage: {  height: 46, width: 99 , resizeMode: 'contain' },
  header1Image: { height: 27, width: 45, marginLeft: 105 },
  header2Image: { height: 27, width: 45 },

  scrollContent: { paddingHorizontal: 30 },


  input: { flex: 1, paddingVertical: 10, paddingHorizontal: 10, fontSize: 16 },
  icon: { marginLeft: 10 },
  buttonText: {
    color: '#5A6ACF',
    fontSize: 16,
    textAlign: 'center',
  },
  midContainer: {
    height: 190,
    width: 318,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  midContainerText: {
    fontSize: 50,
    fontWeight: '900',
    textAlign: 'center',
    color: '#274C77',
  },

  footer: {
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
  },
  footerIcon: { alignItems: 'center', marginTop: 15 },
  iconLabel: { fontSize: 12, color: '#0077cc' },


  container: {
    flex: 1,
    backgroundColor: '#DEFFFC',
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 255,
    borderRadius: 30,
    paddingTop: 70,
  },

  innerScrollContainer: {
    backgroundColor: '#fff',
    height: 328,
    width: 322,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    elevation: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2.41,
    padding: 20,
  },

  notificationCard: {
    backgroundColor: '#fff',
    height: 90,
    width: '100%',
    borderRadius: 15,
    marginTop: 25,
    elevation: 10,
    shadowOffset: { width: 8, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2.41,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Kameron-SemiBold',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 10,
    color: '#4e4e4e',
    fontFamily: 'Kameron-SemiBold',
  },
  descriptionText: {
    fontSize: 10,
    color: '#4e4e4e',
    fontFamily: 'Kameron-SemiBold',
  },
  notificationImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  downloadButton: {
    backgroundColor: '#274c77',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 35,
    marginLeft: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 14,
  },
  mapcontainer: {
    height: 200,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    padding: 20,
    marginTop: -220,
    alignSelf: 'center',
    marginBottom: 165,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#274c77',
  },



});

