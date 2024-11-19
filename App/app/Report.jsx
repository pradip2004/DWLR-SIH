import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Report() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);




    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartPicker(false); // Hide the picker after selecting a date
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date (YYYY-MM-DD)
            setStartDate(formattedDate);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndPicker(false); // Hide the picker after selecting a date
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date (YYYY-MM-DD)
            setEndDate(formattedDate);
        }
    };


    const states = [
        { label: 'Maharashtra', value: 'maharashtra' },
        { label: 'Karnataka', value: 'karnataka' },
        { label: 'West Bengal', value: 'west_bengal' },
        { label: 'Tamil Nadu', value: 'tamil_nadu' },
        { label: 'Uttar Pradesh', value: 'uttar_pradesh' },
    ];

    const cities = [
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Bangalore', value: 'bangalore' },
        { label: 'Kolkata', value: 'kolkata' },
        { label: 'Chennai', value: 'chennai' },
        { label: 'Lucknow', value: 'lucknow' },
    ];

    return (
        <LinearGradient
            colors={['#DEFFFC', '#D4F8FA', '#488DDD']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
          <View style={styles.container}>
    {/* Header Section */}
    <View style={styles.nav}>
        <Image source={require('./../assets/images/image 7.png')} style={styles.headerImage} />
        <Image source={require('./../assets/images/image 7 (1).png')} style={styles.header1Image} />
        <Image source={require('./../assets/images/image 7 (2).png')} style={styles.header2Image} />
    </View>

    {/* Main Content Section */}
    <View contentContainerStyle={styles.scrollContent}>
        {/* Card Section */}
        <View style={styles.card}>
            <Text style={styles.heading}>Download Data</Text>

            {/* Start Date Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Select Start Date"
                    value={startDate}
                    editable={false}
                />
                <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                    <FontAwesome name="calendar" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {showStartPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={handleStartDateChange}
                />
            )}

            {/* End Date Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Select End Date"
                    value={endDate}
                    editable={false}
                />
                <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                    <FontAwesome name="calendar" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {showEndPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={handleEndDateChange}
                />
            )}

            {/* State Picker */}
            <RNPickerSelect
                onValueChange={(value) => setSelectedState(value)}
                items={states}
                placeholder={{ label: 'Select State', value: null }}
                style={pickerSelectStyles}
            />

            {/* City Picker */}
            <RNPickerSelect
                onValueChange={(value) => setSelectedCity(value)}
                items={cities}
                placeholder={{ label: 'Select City', value: null }}
                style={pickerSelectStyles}
            />

            {/* Get Data Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Data</Text>
            </TouchableOpacity>
        </View>

         {/* ScrollView for Form Content */}
      <View contentContainerStyle={styles.scrollContent}>


        <View style={styles.container2}>
          {/* Main ScrollView */}
          <View contentContainerStyle={styles.scrollContainer}>


            <ScrollView style={styles.innerScrollContainer}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}>Download Data</Text>
              
              {[...Array(14)].map((_, index) => (
                <View key={index} style={styles.notificationCard}>
                 <FontAwesome6 name="bookmark" size={24} color="black" />

                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>DWLRs ID</Text>
                    <Text style={styles.subtitleText}>Problem</Text>
                    <Text style={styles.descriptionText}>Explain in one line</Text>
                  </View>
                  <View style={{  alignItems: 'center',}}>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Text style={styles.downloadButtonText}>Download</Text>
                    </TouchableOpacity>
                    
                  </View>
                </View>
              ))}



            </ScrollView>

          </View>
        </View>






      </View>
    </View>

    

    {/* Footer Section */}
    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
            <MaterialCommunityIcons name="view-dashboard-outline" size={26} color="#0077cc" />
            <Text style={styles.iconLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
            <FontAwesome6 name="anchor-circle-check" size={24} color="#0077cc" />
            <Text style={styles.iconLabel}>DWLR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
            <MaterialIcons name="report-problem" size={26} color="#0077cc" />
            <Text style={styles.iconLabel}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
            <FontAwesome5 name="bell" size={24} color="#0077cc" />
            <Text style={styles.iconLabel}>Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
            <Ionicons name="analytics" size={26} color="#0077cc" />
            <Text style={styles.iconLabel}>Analytics</Text>
        </TouchableOpacity>
    </View>
</View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 55,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
    headerImage: { width: 80, height: 40, resizeMode: 'contain' },
    header1Image: { height: 27, width: 45, marginLeft: 105 },
    header2Image: { height: 27, width: 45 },
    scrollContent: { paddingHorizontal: 20 },


    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        height: 400, 
        marginVertical: 70, 
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        maxWidth: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    heading: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
    },
    input: {
        backgroundColor: '#C6C4C41F',
        width: 300,
        height: 52,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 49,
        borderWidth: 3,
        borderColor: '#274C77',
        borderStyle: 'solid',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginBottom: 14,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    buttonText: {
        color: '#5A6ACF',
        fontSize: 16,
        textAlign: 'center',
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

    footerIcon: {
        alignItems: 'center',
    },
    iconLabel: {
        fontSize: 12,
        color: '#0077cc',
        marginTop: 4,
    },

    
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 65,
        borderRadius: 30,
    },

   
    innerScrollContainer: {
        backgroundColor: '#fff',
        height: 190,
        width: 322,
        alignSelf: 'center',
        marginTop: -60,
        borderRadius: 20,
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
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 52,
        width: 310,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        color: '#333',
        backgroundColor: '#f5f5f5',
        fontSize: 16,
        marginBottom: 15,
    },
    inputAndroid: {
        height: 52,
        width: 290,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        color: '#333',
        backgroundColor: '#f5f5f5',
        fontSize: 26,
        marginBottom: 25,
    },
});
