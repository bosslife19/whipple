// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
// import AppProvider from "../context/AppContext"
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';
import { GameProvider } from '../context/AppContext.js'; // adjust path

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ 
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
     montserratMeduim: require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
    MonteserratItalic: require('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
    MonteserratRegular: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    Poppins: require('../assets/fonts/Poppins-Black.ttf'),
    PoppinsMed: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsReg: require('../assets/fonts/Poppins-Regular.ttf'),
 
    PoppinsLight:require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    Grotesk: require('../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'),

  });

   useEffect(() => {
      if (Platform.OS === "ios") {
        // Skip font loading for iOS
        SplashScreen.hideAsync();
      } else if (fontsLoaded) {
        // Hide the splash screen once fonts are loaded
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    // Return null if fonts are loading and the platform is not iOS
    if (!fontsLoaded && Platform.OS !== "ios") {
      return null;
    }
  

  return (
    <GameProvider >
 <Stack screenOptions={{headerShown:false}}>
  <Stack.Screen name="index"/>
</Stack>
 </GameProvider>
  );
} 
