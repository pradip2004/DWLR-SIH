import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="dwlrs" options={{ headerShown: false }} />
      <Stack.Screen name="alert" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ headerShown: false }} />
      <Stack.Screen name="analytic" options={{ headerShown: false }} />
     
    </Stack>
  );
}
