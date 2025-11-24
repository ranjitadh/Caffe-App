import Colors from "@/constants/colors";
import { coffees as mockCoffees } from "@/mock/coffees";
import { CoffeeSize } from "@/types";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [coffee, setCoffee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<CoffeeSize>("medium");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const normalizeSizes = (sizes: any, fallbackDefault: CoffeeSize = "medium") => {
    if (!sizes) {
      return [];
    }

    if (Array.isArray(sizes)) {
      return sizes.map((option: any) => ({
        size: (option.size ?? fallbackDefault).toString().toLowerCase() as CoffeeSize,
        price: Number(option.price) || 0,
      }));
    }

    return Object.entries(sizes).map(([key, value]) => ({
      size: key.toLowerCase() as CoffeeSize,
      price: Number(value),
    }));
  };

  const sizeOptions = normalizeSizes(coffee?.sizes);

  useEffect(() => {
    if (!sizeOptions.length) {
      return;
    }
    const hasSelected = sizeOptions.some((option) => option.size === selectedSize);
    if (!hasSelected) {
      setSelectedSize(sizeOptions[0].size);
    }
  }, [sizeOptions, selectedSize]);

  // Fetch coffee from API
  useEffect(() => {
    async function fetchCoffee() {
      try {
        const res = await fetch(
          "https://thenextcoders.com/coffee/coffee_items.json"
        );
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }
        const text = await res.text();
        const data = JSON.parse(text);
        const selected = data.find((c: any) => c.id.toString() === id);
        setCoffee(selected ?? null);
      } catch (err) {
        console.log("Fetch error:", err);
        const fallback = mockCoffees.find((c) => c.id.toString() === id);
        setCoffee(fallback ?? null);
      } finally {
        setLoading(false);
      }
    }
    fetchCoffee();
  }, [id]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>Coffee not found</Text>
      </View>
    );
  }

  const selectedSizeInfo = sizeOptions.find(
    (s) => s.size === selectedSize
  );

  const handleBuyNow = () => {
    router.push({
      pathname: "/buy-now",
      params: {
        product: JSON.stringify(coffee), // Must stringify!
        size: selectedSize,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#494441ff" />
            </TouchableOpacity>

            <Text style={styles.topBarTitle}>Details</Text>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                size={24}
                color={isFavorite ? "#ED5151" : "#2F2D2C"}
                fill={isFavorite ? "#ED5151" : "transparent"}
              />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: coffee.image }}
            style={styles.image}
            contentFit="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{coffee.title ?? coffee.name}</Text>
          <Text style={styles.subtitle}>
            {coffee.description ?? "Freshly brewed coffee prepared to perfection."}
          </Text>

          <View style={styles.ratingSection}>
            <Star size={20} color="#FBBE21" fill="#FBBE21" />
            <Text style={styles.rating}>{coffee.rating || 4.5}</Text>
            <Text style={styles.reviews}>({coffee.reviews || 12})</Text>
          </View>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {sizeOptions.map((size) => (
              <TouchableOpacity
                key={size.size}
                style={[
                  styles.sizeButton,
                  selectedSize === size.size && styles.sizeButtonActive,
                ]}
                onPress={() => setSelectedSize(size.size)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === size.size && styles.sizeButtonTextActive,
                  ]}
                >
                  {size.size.charAt(0).toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>
            {selectedSizeInfo ? `$ ${selectedSizeInfo.price.toFixed(2)}` : "--"}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleBuyNow}>
          <Text style={styles.addToCartText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  imageContainer: { width, height: width, position: "relative" },
  image: {
    width: "90%",
    height: "50%",
    alignSelf: "center",
    marginTop: 150,
    borderRadius: 20,
  },
  topBar: {
    position: "absolute",
    top: Platform.select({ ios: 60, android: 50, web: 20 }),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarTitle: { fontSize: 18, fontWeight: "700", color: "#2F2D2C" },
  content: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: "#9B9B9B", marginBottom: 16 },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  rating: { fontSize: 16, fontWeight: "700", color: Colors.light.text },
  reviews: { fontSize: 12, color: "#9B9B9B" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 12,
  },
  sizeContainer: { flexDirection: "row", gap: 12, marginBottom: 24 },
  sizeButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.card,
  },
  sizeButtonActive: {
    backgroundColor: "#f9e1d0ff",
    borderColor: Colors.light.primary,
  },
  sizeButtonText: { fontSize: 16, fontWeight: "600", color: "#9B9B9B" },
  sizeButtonTextActive: { color: Colors.light.primary, fontWeight: "700" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    gap: 16,
  },
  priceSection: { justifyContent: "center" },
  priceLabel: { fontSize: 14, color: "#9B9B9B", marginBottom: 4 },
  price: { fontSize: 20, fontWeight: "700", color: Colors.light.primary },
  addToCartButton: {
    width: "65%",
    marginLeft: "auto",
    height: 56,
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
