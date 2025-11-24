import Colors from "@/constants/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Truck } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function DeliveryTrackingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        {/* Map Image */}
        <Image
          source={require("@/assets/images/Maps.png")}
          style={styles.map}
          contentFit="cover"
        />
        
        {/* Origin Marker (Scooter) - positioned at top-left area */}
        <View style={[styles.markerContainer, { top: "25%", left: "20%" }]}>
          <View style={styles.scooterMarker}>
            <Truck size={24} color={Colors.light.primary} />
          </View>
        </View>

        {/* Destination Marker (Pin) - positioned at bottom-right area */}
        <View style={[styles.markerContainer, { top: "70%", left: "75%" }]}>
          <View style={styles.pinMarker}>
            <View style={styles.pinDot} />
            <View style={styles.pinShadow} />
          </View>
        </View>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => router.back()}
          >
            <Image
              source={require("@/assets/images/Back.svg")}
              style={styles.mapButtonIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Image
              source={require("@/assets/images/gps.svg")}
              style={styles.mapButtonIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />

        <View style={styles.bottomSheetContent}>
          {/* Estimated Time */}
          <View style={styles.timeAndAddressContainer}>
            <Text style={styles.estimatedTime}>10 minutes left</Text>
            <Text style={styles.deliveryAddress}>Delivery to Jl. Kpg Sutoyo</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={[
                  styles.progressStep,
                  step <= 3 && styles.progressStepActive,
                ]}
              />
            ))}
          </View>

          {/* Delivered Order Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardIcon}>
              <Image
                source={require("@/assets/images/deliverboy.png")}
                style={styles.deliveryIcon}
                contentFit="contain"
              />
            </View>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Delivered your order</Text>
              <Text style={styles.infoCardSubtitle}>
                We will deliver your goods to you in the shortes possible time.
              </Text>
            </View>
          </View>

          {/* Courier Information Card */}
          <View style={styles.courierCard}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=12",
              }}
              style={styles.courierAvatar}
              contentFit="cover"
            />
            <View style={styles.courierInfo}>
              <Text style={styles.courierName}>Brooklyn Simmons</Text>
              <Text style={styles.courierRole}>Personal Courier</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Image
                source={require("@/assets/images/Call.svg")}
                style={styles.callButtonIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    position: "absolute",
    zIndex: 10,
  },
  mapControls: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  mapButtonIcon: {
    width: 44,
    height: 44,
  },
  scooterMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pinMarker: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  pinShadow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
    opacity: 0.3,
    marginTop: -2,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    maxHeight: height * 0.5,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.light.border,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  bottomSheetContent: {
    padding: 20,
    gap: 5,
    
  },
  timeAndAddressContainer: {
    alignItems: "center",
    marginVertical: 8,
    marginTop:10,
  },
  estimatedTime: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },
  deliveryAddress: {
    fontSize: 14,
    color: Colors.light.textLight,
    marginTop: 4,
    textAlign: "center",
  
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.light.border,
  },
  progressStepActive: {
    backgroundColor: "#31B057",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  infoCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF7F0",
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryIcon: {
    width: 28,
    height: 28,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  infoCardSubtitle: {
    fontSize: 13,
    color: Colors.light.textLight,
    lineHeight: 18,
  },
  courierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  courierAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 2,
  },
  courierRole: {
    fontSize: 13,
    color: Colors.light.textLight,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E3E3E3",
  },
  callButtonIcon: {
    width: 44,
    height: 44,
  },
});
