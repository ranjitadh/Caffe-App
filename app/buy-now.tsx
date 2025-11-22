import Colors from "@/constants/colors";
import { CoffeeSize } from "@/types";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronDown, Edit3, Minus, Plus, Trash2 } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// ---------------------------
// Slider Toggle Component
// ---------------------------
function SliderToggle({
  options,
  value,
  onChange,
}: {
  options: [string, string];
  value: string;
  onChange: (val: string) => void;
}) {
  const [width, setWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: value === options[0] ? 0 : width / 2,
      speed: 20,
      bounciness: 6,
      useNativeDriver: false,
    }).start();
  }, [value, width]);

  return (
    <View style={styles.toggleWrapper}>
      <View
        style={styles.toggleContainer}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            styles.toggleActive,
            {
              width: width / 2,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />

        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.toggleOption}
            onPress={() => onChange(opt)}
          >
            <Text
              style={[
                styles.toggleLabel,
                value === opt && styles.toggleLabelActive,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}


// ---------------------------
// Main Screen
// ---------------------------
export default function BuyNowScreen() {
  const { coffee: coffeeParam, size: sizeParam } = useLocalSearchParams<{
    coffee: string;
    size: string;
  }>();
  const router = useRouter();

  const product = coffeeParam ? JSON.parse(coffeeParam) : null;

  if (!product)
    return (
      <View style={styles.container}>
        <Text>No product selected</Text>
      </View>
    );

  const initialSize = (sizeParam as CoffeeSize) || "Medium";
  const initialPrice =
    product.sizes.find((s: any) => s.size === initialSize)?.price || 0;

  // STATES
  const [deliveryMode, setDeliveryMode] = useState<"deliver" | "pickup">(
    "deliver"
  );
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(
    "Jl. Kpg Sutoyo No. 620, Blizen, Tanjungbalai"
  );
  const [showDiscount, setShowDiscount] = useState(true);

  const deliveryFee = deliveryMode === "deliver" ? 1.0 : 0;
  const discount = showDiscount ? 1.0 : 0;

  const price = initialPrice * quantity;
  const total = price + deliveryFee - discount;

  // HANDLERS
  const updateQuantity = (delta: number) =>
    setQuantity(Math.max(1, quantity + delta));

  const editAddress = () =>
    Alert.alert("Edit Address", "Address editing here.");
  const addNote = () => Alert.alert("Note", "Add note here.");
  const toggleDiscount = () => setShowDiscount(!showDiscount);
  const selectPayment = () =>
    Alert.alert("Payment Method", "Select payment here.");

  const confirmOrder = () => {
    Alert.alert("Order Confirmed", `Order placed for $${total.toFixed(2)}!`);
    router.push("/success");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Order" }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---- Toggle ---- */}
        <SliderToggle
          options={["Deliver", "Pick Up"]}
          value={deliveryMode === "deliver" ? "Deliver" : "Pick Up"}
          onChange={(v) =>
            setDeliveryMode(v === "Deliver" ? "deliver" : "pickup")
          }
        />

        {/* ---- Address ---- */}
        {deliveryMode === "deliver" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{address}</Text>

              <View style={styles.addressActions}>
                <TouchableOpacity
                  onPress={editAddress}
                  style={styles.actionButton}
                >
                  <Edit3 size={16} color={Colors.light.primary} />
                  <Text style={styles.actionText}>Edit Address</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={addNote} style={styles.actionButton}>
                  <Text style={styles.actionText}>Add Note</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ---- Product ---- */}
        <View style={styles.section}>
          <View style={styles.itemContainer}>
            <Image source={product.image} style={styles.itemImage} />

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemSize}>{initialSize}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(-1)}
                >
                  <Minus size={16} />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(1)}
                >
                  <Plus size={16} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity>
              <Trash2 size={18} color="#ED5151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ---- Discount ---- */}
        <TouchableOpacity style={styles.discountRow} onPress={toggleDiscount}>
          <View style={styles.discountIcon} />
          <Text style={styles.discountText}>1 Discount is Applied</Text>
          <ChevronDown size={20} color="#9B9B9B" />
        </TouchableOpacity>

        {/* ---- Payment Summary ---- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryValue}>$ {price.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(2)}</Text>
          </View>

          {showDiscount && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, { color: "#ED5151" }]}>
                - $ {discount.toFixed(2)}
              </Text>
            </View>
          )}
        </View>

        {/* ---- Payment Method ---- */}
        <TouchableOpacity style={styles.paymentRow} onPress={selectPayment}>
          <View style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Cash/Wallet</Text>

          <View style={styles.paymentTotal}>
            <Text style={styles.paymentTotalText}>$ {total.toFixed(2)}</Text>
            <ChevronDown size={20} color="#9B9B9B" />
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ---- Order Button ---- */}
      <TouchableOpacity style={styles.orderButton} onPress={confirmOrder}>
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------------------
// Styles
// ---------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
toggleWrapper: {
  alignItems: "center",
  marginBottom: 20,
},

toggleContainer: {
  height: 42,
  width: "90%",
  backgroundColor: "#e7e4e1ff", // light brown-ish grey like screenshot
  borderRadius: 5,
  flexDirection: "row",
  padding: 2,
  position: "relative",
},

toggleActive: {
  position: "absolute",
  top: 3,
  left: 3,
  height: "100%",
  backgroundColor: "#b45b24ff", // primary brown (matches your screenshot)
  borderRadius: 10,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 2 },
},

toggleOption: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

toggleLabel: {
  fontSize: 14,
  fontWeight: "700",
  color: "#000000ff",
},

toggleLabelActive: {
  color: "#fff",
  fontWeight: "700",
},

  // Slider
  sliderContainer: {
    height: 40,
    borderRadius: 0,
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    marginBottom: 20,
    overflow: "hidden",
  },
  sliderActive: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: Colors.light.primary,
    borderRadius: 0,
  },
  sliderOption: {
    justifyContent: "center",
    alignItems: "center",
  },
  sliderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
  },
  sliderTextActive: { color: "#fff" },

  // Sections
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 4,
    marginBottom: 8,
    color: Colors.light.text,
  },

  // Address
  addressContainer: {
    paddingHorizontal: 1,
    padding: 16,
    backgroundColor: Colors.light.card,

  },
  addressText: {
    fontSize: 14,
    color: "#848181ff",
    marginBottom: 12,
  },
  addressActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionText: { color: Colors.light.primary, fontWeight: "600" },

  // Item
  itemContainer: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 12,
    gap: 12,
    alignItems: "center",
  },
  itemImage: { width: 60, height: 60, borderRadius: 8 },
  itemDetails: { flex: 1, gap: 4 },
  itemName: { fontSize: 16, fontWeight: "700" },
  itemSize: { fontSize: 14, color: "#9B9B9B" },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: { fontSize: 16, fontWeight: "700", minWidth: 20, textAlign: "center" },

  // Discount
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  discountIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
  },
  discountText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },

  // Summary
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  summaryLabel: { color: "#9B9B9B" },
  summaryValue: { fontWeight: "700", color: Colors.light.text },

  // Payment method
  paymentRow: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
  },
  paymentText: { fontSize: 16, fontWeight: "600" },
  paymentTotal: { flexDirection: "row", alignItems: "center", gap: 6 },
  paymentTotalText: { fontSize: 18, fontWeight: "700", color: Colors.light.primary },

  // Order button
  orderButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  orderButtonText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
