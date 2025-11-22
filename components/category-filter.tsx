import colors from "@/constants/colors";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CategoryFilterProps {
  categories: { id: string; name: string; icon?: string }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}
export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.button,
            selectedCategory === category.id && styles.buttonActive,
          ]}
          onPress={() => onSelectCategory(category.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.text,
              selectedCategory === category.id && styles.textActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  content: {
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.light.backgroundAlt,
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonActive: {
    backgroundColor: colors.light.primary,
    borderColor: colors.light.primary,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.light.textLight,
  },
  textActive: {
    color: "#FFFFFF",
  },
});
