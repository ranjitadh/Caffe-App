import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NotificationIcon } from "./notifications";

// Correct lucide icons
import { Home, ShoppingBag } from "lucide-react-native";
import { HeartIcon } from "./wishlist";

export default function TabLayout() {
  const { itemCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: "#8D8D8D",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.card,
          borderTopColor: Colors.light.border,
          height: 70,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          fontFamily: "Inter_600SemiBold",
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />

      {/* Wishlist */}
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <HeartIcon size={24} color={color} filled={focused} />
          ),
        }}
      />

      {/* Cart */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View>
              <ShoppingBag size={24} color={color} />
              {itemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      {/* Notifications */}
     <Tabs.Screen
  name="notifications"
  options={{
    title: "",
    tabBarIcon: ({ color, focused }) => (
      <NotificationIcon size={24} color={color} filled={focused} />
    ),
  }}
/>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#ED5151",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
});
