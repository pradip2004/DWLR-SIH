import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const piechart = () => {
    return (
        <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
            {/* Pie chart  */}
            <View
                style={{
                    height: 40,
                    width: 110,
                    borderRadius: 12,
                    borderColor: '#247c77',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <MaterialIcons name="donut-small" size={20} />
                <Text>  Pie Chart</Text>
            

            </View>

            {/* Bar chart  */}
            <View
                style={{
                    height: 40,
                    width: 110,
                    borderRadius: 12,
                    borderColor: '#247c77',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <MaterialIcons name="bar-chart" size={22} />
                <Text> Bar Chart</Text>
            </View>
        </View>
    )
}

export default piechart