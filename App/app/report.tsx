import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Footer from '@/component/Footer';


export default function Report() {

    const router = useRouter();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
    const [isCityDropdownVisible, setCityDropdownVisible] = useState(false);




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

    const handleDropdownToggle = (section) => {
        if (section === 'state') {
            setStateDropdownVisible(!isStateDropdownVisible);
        } else if (section === 'city') {
            setCityDropdownVisible(!isCityDropdownVisible);
        }
    };

    const handleSelect = (section, value) => {
        if (section === 'state') {
            setSelectedState(value);
            setStateDropdownVisible(false);
        } else if (section === 'city') {
            setSelectedCity(value);
            setCityDropdownVisible(false);
        }
    };

    return (
        <LinearGradient
            colors={["#DEFFFC", "#D4F8FA", "#488DDD"]}
            locations={[0, 0.22, 28.5]} // Define color stops
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.nav}>
                    <Image source={require('./../assets/images/logo.png')} style={styles.headerImage} />
                    <Image source={require('./../assets/images/image 7 (1).png')} style={styles.header1Image} />
                    <Image source={require('./../assets/images/image 7 (2).png')} style={styles.header2Image} />
                </View>


                <View style={styles.card}>
                    <Text style={styles.heading}>Download Data</Text>
                    <Text style={styles.dateLabel}>Select Start Date</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="dd-mm-yyyy"
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
                    </View>
                    <Text style={styles.dateLabel}>Select End Date</Text>

                    {/* End Date Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="dd-mm-yyyy"
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
                    </View>

                    {/* //city */}
                    <Text style={styles.dateLabel}>Select State</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Choose a State"
                                value={selectedState}
                                editable={false}
                            />
                            <TouchableOpacity onPress={() => handleDropdownToggle('state')}>
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {isStateDropdownVisible && (
                            <View style={styles.dropdownMenu}>
                                {states.map(state => (
                                    <TouchableOpacity key={state.value} onPress={() => handleSelect('state', state.value)}>
                                        <Text style={styles.dropdownItem}>{state.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    <Text style={styles.dateLabel}>Select City</Text>

                    {/* End Date Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Choose a City"
                                value={selectedCity}
                                editable={false}
                            />
                            <TouchableOpacity onPress={() => handleDropdownToggle('city')}>
                                <Entypo name="chevron-small-down" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {isCityDropdownVisible && (
                            <View style={styles.dropdownMenu}>
                                {cities.map(city => (
                                    <TouchableOpacity key={city.value} onPress={() => handleSelect('city', city.value)}>
                                        <Text style={styles.dropdownItem}>{city.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Get Data Button */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Get Data</Text>
                    </TouchableOpacity>
                </View>


                {/* ScrollView for Form Content */}


                <ScrollView style={styles.innerScrollContainer}>
                    <Text style={{
                        fontSize: 24,

                        fontFamily: 'Kameron-SemiBold',
                    }}>DWLRs Reports</Text>

                    {[...Array(14)].map((_, index) => (
                        <View key={index} style={styles.notificationCard}>
                            <FontAwesome6 name="bookmark" size={24} color="orange" />

                            <View style={styles.textContainer}>
                                <Text style={styles.titleText}>DWLRs ID</Text>
                                <Text style={styles.subtitleText}>Problem</Text>
                                <Text style={styles.descriptionText}>Explain in one line</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity style={[styles.downloadButton, { marginBottom: 10 }]}>
                                    <Text style={styles.downloadButtonText}>Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.downloadButton}>
                                    <Text style={styles.downloadButtonText}>Download</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))}



                </ScrollView>

            </SafeAreaView>








            {/* Footer Section */}
            <Footer/>



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
    headerImage: { width: scale(80), height: verticalScale(40), resizeMode: 'contain' },
    header1Image: { height: verticalScale(27), width: scale(45), marginLeft: scale(105) },
    header2Image: { height: verticalScale(27), width: scale(45) },
    scrollContent: { paddingHorizontal: scale(20) },
    card: {
        backgroundColor: 'white',
        padding: scale(20),
        borderRadius: scale(15),
        marginTop: verticalScale(65),
        marginHorizontal: scale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(2) },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(3.84),
        elevation: 5,
    },
    heading: {
        fontSize: moderateScale(28),
        fontFamily: 'Kameron-SemiBold',
        marginBottom: verticalScale(2),
        marginTop: verticalScale(-10),
    },
    dateLabel: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: '#6c757d',
        marginBottom: verticalScale(5),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(3),
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: scale(8),
        paddingHorizontal: scale(10),
        height: verticalScale(40),
    },
    input: {
        flex: 1,
        height: verticalScale(40),
        fontSize: moderateScale(16),
    },
    icon: {
        marginLeft: scale(10),
    },
    button: {
        backgroundColor: '#274c77',
        borderRadius: scale(8),
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(20),
        alignItems: 'center',
        marginTop: verticalScale(10),
    },
    buttonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        height: verticalScale(60),
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(-2) },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(3.84),
    },
    footerIcon: {
        alignItems: 'center',
    },
    iconLabel: {
        fontSize: moderateScale(12),
        color: '#0077cc',
        marginTop: verticalScale(6),
    },
    innerScrollContainer: {
        flex: 1,
        marginTop: verticalScale(9),
        marginHorizontal: scale(12),
        borderRadius: scale(15),
        backgroundColor: 'white',
        padding: scale(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(2) },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(3.84),
        elevation: 5,
        maxHeight: verticalScale(165),
    },
    dropdownMenu: {
        borderWidth: 1,
        borderColor: '#488DDD',
        borderRadius: scale(8),
        backgroundColor: 'white',
        padding: scale(10),
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        maxHeight: verticalScale(200),
        overflow: 'hidden',
    },
    dropdownItem: {
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(16),
        fontSize: moderateScale(16),
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    notificationCard: {
        backgroundColor: '#fff',
        height: verticalScale(90),
        width: '100%',
        borderRadius: scale(15),
        marginTop: verticalScale(10),
        elevation: 10,
        shadowOffset: { width: scale(8), height: verticalScale(4) },
        shadowOpacity: 0.3,
        shadowRadius: moderateScale(2.41),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(15),
    },
    textContainer: {
        flex: 1,
        marginLeft: scale(10),
    },
    titleText: {
        fontSize: moderateScale(16),
        color: 'black',
        fontFamily: 'Kameron-SemiBold',
        marginBottom: verticalScale(5),
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
    downloadButton: {
        backgroundColor: '#274c77',
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(75),
        height: verticalScale(35),
        marginLeft: scale(10),
    },
    downloadButtonText: {
        color: 'white',
        fontSize: moderateScale(14),
    },
});