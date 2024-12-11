import { View, Text,Image } from 'react-native'
import React from 'react'
import { verticalScale,scale,moderateScale } from 'react-native-size-matters'
export default function Header() {
  return (
    <View
                style={{
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
                }}
            >
                 <Image source={require('./../assets/images/logo.png')} style={{ width: scale(80), height: verticalScale(40), resizeMode: 'contain'}} />
                    <Image source={require('./../assets/images/image 7 (1).png')} style={{height: verticalScale(27), width: scale(45), marginLeft: scale(105)}} />
                    <Image source={require('./../assets/images/image 7 (2).png')} style={{height: verticalScale(27), width: scale(45)}} />
            </View>
  )
}