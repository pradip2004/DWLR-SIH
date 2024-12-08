import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function Footer() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const handlePress = (screen, index) => {
    setSelected(index); // Update selected icon index
    router.push(screen); // Navigate to the respective screen
  };

  return (
    <View
      style={{
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
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: selected === 0 ? '#0077cc' : 'transparent',
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress('/dashboard', 0)}
      >
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={26}
          color={selected === 0 ? 'white' : '#0077cc'}
        />
        <Text style={{ fontSize: 12, color: selected === 0 ? 'white' : '#0077cc' }}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: selected === 1 ? '#0077cc' : 'transparent',
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress('/dwlrs', 1)}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={selected === 1 ? 'white' : '#0077cc'}
        />
        <Text style={{ fontSize: 12, color: selected === 1 ? 'white' : '#0077cc' }}>DWLR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: selected === 2 ? '#0077cc' : 'transparent',
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress('/report', 2)}
      >
        <MaterialIcons
          name="report-problem"
          size={26}
          color={selected === 2 ? 'white' : '#0077cc'}
        />
        <Text style={{ fontSize: 12, color: selected === 2 ? 'white' : '#0077cc' }}>Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: selected === 3 ? '#0077cc' : 'transparent',
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress('/alert', 3)}
      >
        <FontAwesome5
          name="bell"
          size={24}
          color={selected === 3 ? 'white' : '#0077cc'}
        />
        <Text style={{ fontSize: 12, color: selected === 3 ? 'white' : '#0077cc' }}>Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: selected === 4 ? '#0077cc' : 'transparent',
          borderRadius: 10,
          padding: 5,
        }}
        onPress={() => handlePress('/analytic', 4)}
      >
        <Ionicons
          name="pie-chart"
          size={26}
          color={selected === 4 ? 'white' : '#0077cc'}
        />
        <Text style={{ fontSize: 12, color: selected === 4 ? 'white' : '#0077cc' }}>Analytics</Text>
      </TouchableOpacity>
    </View>
  );
}
