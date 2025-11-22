import { CartProvider } from "@/contexts/CartContext";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack screenOptions={{ headerBackTitle: "Back" }}>
  <Stack.Screen name="onboarding" options={{ headerShown: false }} />
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="buy-now" options={{ headerShown: true }} />
</Stack>

        </GestureHandlerRootView>
      </CartProvider>
    </QueryClientProvider>
  );
}
