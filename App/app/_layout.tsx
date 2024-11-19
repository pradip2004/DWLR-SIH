import { Stack } from "expo-router";
import { Alert } from 'react-native'

export default function RootLayout() {
  return(
    <Stack>
      
      <Stack.Screen name="Alert" options={{
        headerShown:false
      }}/>
    </Stack>
  )
}
