import Colors from "@/constants/colors";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, Edit, FileText, Minus, Plus, Wallet } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DeliveryMode = "deliver" | "pickup";

export default function BuyNowScreen() {
  const router = useRouter();
  const { product: productParam, size: sizeParam } = useLocalSearchParams();

  const [product, setProduct] = useState<any>(null);
  // selectedSize is used internally for price calculation, not displayed
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("deliver");

  useEffect(() => {
    if (!productParam) return;

    try {
      const parsedProduct =
        typeof productParam === "string"
          ? JSON.parse(productParam)
          : productParam;

      setProduct(parsedProduct);
    } catch (err) {
      console.error("Failed to parse product:", err);
    }
  }, [productParam]);

  const sizeOptions = useMemo(() => {
    if (!product?.sizes) return [];
    return Object.entries(product.sizes).map(([key, value]) => ({
      size: key,
      price: Number(value),
    }));
  }, [product]);

  useEffect(() => {
    if (!sizeOptions.length) {
      // Use product price as fallback if no sizes
      if (product?.price) {
        setPrice(Number(product.price));
      }
      return;
    }

    const normalizedParam =
      typeof sizeParam === "string" && sizeParam.length > 0
        ? sizeParam
        : sizeOptions[0].size;

    const fallbackOption =
      sizeOptions.find((option) => option.size === normalizedParam) ??
      sizeOptions[0];

    setSelectedSize(fallbackOption.size);
    setPrice(fallbackOption.price);
  }, [sizeOptions, sizeParam, product]);

  // Calculate price - use selected size price or fallback to product price
  const itemPrice = useMemo(() => {
    if (price > 0) return price;
    if (product?.price) return Number(product.price);
    return 0;
  }, [price, product]);

  const deliveryFee = deliveryMode === "deliver" ? 1 : 0;
  const baseDeliveryFee = 2;
  const subtotal = itemPrice * quantity;

  const handleQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Invalid product data</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.toggleGroup}>
          {(["deliver", "pickup"] as DeliveryMode[]).map((mode) => (
          <TouchableOpacity
              key={mode}
              style={[
                styles.toggleButton,
                deliveryMode === mode && styles.toggleButtonActive,
              ]}
              onPress={() => setDeliveryMode(mode)}
            >
              <Text
                style={[
                  styles.toggleText,
                  deliveryMode === mode && styles.toggleTextActive,
                ]}
              >
                {mode === "deliver" ? "Deliver" : "Pick Up"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Delivery Address</Text>
          <Text style={styles.addressTitle}>Jl. Kpg Sutoyo</Text>
          <Text style={styles.addressSubtitle}>
            Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
          </Text>
          <View style={styles.addressActions}>
            <TouchableOpacity style={styles.outlineButton}>
              <Edit size={12} color={Colors.light.text} style={{ marginRight: 4 }} />
              <Text style={styles.outlineButtonText}>Edit Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineButton}>
              <FileText size={12} color={Colors.light.text} style={{ marginRight: 4 }} />
              <Text style={styles.outlineButtonText}>Add Note</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.productRow}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.productTitle}>{product.title ?? product.name}</Text>
              <Text style={styles.productSubtitle}>
                {product.description ?? "Deep Foam"}
              </Text>
            </View>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantity(-1)}
              >
                <Minus size={16} color="#2F2D2C" />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantity(1)}
              >
                <Plus size={16} color="#2F2D2C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.discountCard}>
          <View style={styles.discountRow}>
            <View style={styles.discountIconContainer}>
              <Image
                source={require("@/assets/images/discount.png")}
                style={styles.discountIcon}
                contentFit="contain"
              />
            </View>
            <Text style={styles.discountText}>1 Discount is Applied</Text>
          </View>
          <ChevronDown size={18} color="#2F2D2C" />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryValue}>$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <View style={styles.deliveryValue}>
              <Text style={styles.oldPrice}>$ {baseDeliveryFee.toFixed(1)}</Text>
              <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.walletRow}>
              <Wallet size={20} color={Colors.light.primary} />
              <View>
                <Text style={styles.walletLabel}>Cash/Wallet</Text>
                <Text style={styles.walletBalance}>$ 5.53</Text>
              </View>
            </View>
            <ChevronDown size={18} color="#2F2D2C" />
          </View>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => router.push("/delivery-tracking")}
          >
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  backButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  toggleGroup: {
    flexDirection: "row",
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8D8D8D",
  },
  toggleTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  addressSubtitle: {
    fontSize: 13,
    color: Colors.light.textLight,
    marginTop: 4,
  },
  addressActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  outlineButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  outlineButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.light.text,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  productSubtitle: {
    fontSize: 13,
    color: Colors.light.textLight,
  },
  productMeta: {
    fontSize: 12,
    color: Colors.light.textLight,
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  discountCard: {
    backgroundColor: "#FFF7F0",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  discountIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFE3CC",
    alignItems: "center",
    justifyContent: "center",
  },
  discountIcon: {
    width: 16,
    height: 16,
  },
  discountText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    fontWeight: "bold",
  },
  summaryLabel: {
    fontSize: 14,
    
    color: Colors.light.textLight,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  deliveryValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: Colors.light.textLight,
    textDecorationLine: "line-through",
  },
  walletCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    padding: 18,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  walletLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  walletBalance: {
    fontSize: 16,
    fontWeight: "700",
    
    color:  Colors.light.primary,
  },
  orderButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.text,
  },
});
