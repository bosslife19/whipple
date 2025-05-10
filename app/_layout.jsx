// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ 
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
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
<Stack screenOptions={{headerShown:false}}>
  <Stack.Screen name="index"/>
</Stack>
  );
}
