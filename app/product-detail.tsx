import { coffeeProducts, sizes } from "@/constants/coffeeData";
import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);

  const product = coffeeProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    router.push("/(tabs)/cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.light.text}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={24}
            color={colors.light.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.ratingBadge}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color="#FFC107"
            />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleSection}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.category}>Espresso coffee</Text>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          {/* Rating and Reviews */}
          <View style={styles.reviewSection}>
            <View style={styles.ratingRow}>
              <MaterialCommunityIcons
                name="star"
                size={18}
                color={colors.light.primary}
              />
              <Text style={styles.ratingNumber}>{product.rating}</Text>
              <Text style={styles.reviews}>({product.reviews} reviews)</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeButtons}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  style={[
                    styles.sizeButton,
                    selectedSize === size.id && styles.sizeButtonActive,
                  ]}
                  onPress={() => setSelectedSize(size.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size.id && styles.sizeTextActive,
                    ]}
                  >
                    {size.abbr}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="shopping-outline"
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.light.backgroundAlt,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    height: width * 0.9,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.light.backgroundAlt,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.light.text,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.light.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: colors.light.textLight,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.light.primary,
  },
  reviewSection: {
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.light.text,
  },
  reviews: {
    fontSize: 12,
    color: colors.light.textLight,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.light.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: colors.light.textLight,
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.light.primary,
  },
  sizeSection: {
    marginBottom: 24,
  },
  sizeButtons: {
    flexDirection: "row",
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.light.backgroundAlt,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  sizeButtonActive: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.light.textLight,
  },
  sizeTextActive: {
    color: "#FFFFFF",
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.light.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 120,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  quantityValue: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: colors.light.text,
  },
  bottomAction: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: colors.light.background,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: colors.light.primary,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
