import { View, Text,Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View
                style={{
                    height: 60,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    backgroundColor: "#fff",
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30
                }}
            >
                <Image source={require("../assets/images/image1.png")} style={{ height: 40, width: 100 }} />
                <Image source={require("../assets/images/image2.png")} style={{ height: 27, width: 45,left:50 }} />
                <Image source={require("../assets/images/image3.png")} style={{ height: 30, width: 55, }} />
            </View>
  )
}