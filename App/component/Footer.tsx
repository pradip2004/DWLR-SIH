import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Router, useRouter } from 'expo-router';

export default function Footer() {

    const router= useRouter()

  return (
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
            <Ionicons name="person-outline" size={24} color="#0077cc" />
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
            <Ionicons name="pie-chart" size={26} color="#0077cc" />
            <Text style={{ fontSize: 12, color: '#0077cc' }}>Analytics</Text>
        </TouchableOpacity>
    </View>
  )
}