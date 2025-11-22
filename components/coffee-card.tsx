import colors from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CoffeeCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  onPress?: () => void;
}

export function CoffeeCard({
  id,
  name,
  image,
  price,
  rating,
  onPress,
}: CoffeeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={20}
            color={colors.light.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons
              name="star"
              size={14}
              color={colors.light.primary}
            />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 16,
    marginBottom: 8,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 8,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.light.text,
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.light.text,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.light.primary,
  },
});
