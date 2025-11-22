import colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Image-Onboarding.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
          style={styles.gradient}
        >
          <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) + 40 }]}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Fall in Love with{"\n"}Coffee in Blissful{"\n"}Delight!</Text>
              <Text style={styles.subtitle}>
                Welcome to our cozy coffee corner, where{"\n"}every cup is a delightful for you.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace("/(tabs)/home")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "55%",
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
  },
  textContainer: {
    marginBottom: 40,
  },
title: {
  fontSize: 36,
  fontFamily: "Inter_600SemiBold",
  color: "#FFFFFF",
  lineHeight: 50,
  marginBottom: 25,
  textAlign: "center",
},


  subtitle: {
    fontSize: 16,                     
    fontFamily: "Inter_600SemiBold",   
    color: "#aaaaaaff",
    lineHeight: 24,
    textAlign: "center",              
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.light.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,                      
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
});
