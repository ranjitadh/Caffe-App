import Colors from "@/constants/colors";
import { categories as mockCategories, coffees as mockCoffees } from "@/mock/coffees";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Category = {
  id: string;
  title: string;
};

type CoffeeItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  price: number;
  rating?: number;
  reviews?: number;
};

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [coffees, setCoffees] = useState<CoffeeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const fetchData = useCallback(async () => {
    const fetchJson = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON payload from ${url}`);
      }
    };

    const hydrateData = (
      categoriesSource: any[],
      itemsSource: any[],
      fromFallback: boolean
    ) => {
      const normalizedCategories: Category[] = [
        { id: "all", title: "All" },
        ...categoriesSource
          .map((cat: any) => ({
            id: String(cat.id ?? cat.title ?? cat.name ?? cat.category ?? ""),
            title: cat.title ?? cat.name ?? "Category",
          }))
          .filter((cat) => cat.id && cat.id !== "all")
          .filter(
            (cat, index, arr) => arr.findIndex((c) => c.id === cat.id) === index
          ),
      ];

      const normalizedCoffees: CoffeeItem[] = itemsSource.map((item: any) => ({
        id: String(item.id),
        title: item.title ?? item.name ?? "Coffee",
        description: item.description ?? "Freshly brewed just for you.",
        image: typeof item.image === "string" ? item.image : "",
        categoryId: String(item.category_id ?? item.category ?? ""),
        price: Number(item.price) || 0,
        rating: item.rating,
        reviews: item.reviews,
      }));

      setCategories(normalizedCategories);
      setCoffees(normalizedCoffees);
      setSelectedCategory("all");
      setError(
        fromFallback
          ? "Live menu unreachable. Showing sample data."
          : null
      );
    };

    setLoading(true);
    try {
      const [categoriesData, itemsData] = await Promise.all([
        fetchJson("https://thenextcoders.com/coffee/categories.json"),
        fetchJson("https://thenextcoders.com/coffee/coffee_items.json"),
      ]);
      hydrateData(categoriesData, itemsData, false);
    } catch (apiError) {
      console.log("API Error:", apiError);
      hydrateData(mockCategories, mockCoffees, true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesCategory =
      selectedCategory === "all" || coffee.categoryId === selectedCategory;
    const title = coffee.title.toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={['#000000ff', '#1A1918']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerSubtitle}>Location</Text>

            <View style={styles.locationRow}>
              <Text style={styles.headerTitle}>Bilzen, Tanjungbalai</Text>
              <TouchableOpacity>
                <ChevronDown size={18} color="#f3efecff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.topWrapper}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#8D8D8D" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search coffee..."
              placeholderTextColor="#8D8D8D"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Promotional Banner */}
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerContainer}>
            <Image
              source={require("@/assets/images/Banner.png")}
              style={styles.bannerImage}
              contentFit="cover"
            />
            <View style={styles.bannerOverlay}>
              <View style={styles.promoTag}>
                <Text style={styles.promoText}>Promo</Text>
              </View>
              <View style={styles.bannerTextContainer}>
                <View style={styles.bannerTitleContainer}>
                  <Text style={styles.bannerTitle}>Buy one get</Text>
                  <View style={styles.bannerTitleStripe} />
                </View>
                <View style={styles.bannerTitleContainer}>
                  <Text style={styles.bannerTitle}>one FREE</Text>
                  <View style={styles.bannerTitleStripe} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryButton,
                selectedCategory === cat.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextActive,
                ]}
              >
                {cat.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Coffee Products */}
        <View style={styles.productsGrid}>
          {filteredCoffees.map((coffee) => (
            <TouchableOpacity
              key={coffee.id}
              style={styles.productCard}
              onPress={() =>
                router.push({
                  pathname: "/product/[id]",
                  params: { id: coffee.id },
                })
              }
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: coffee.image }}
                  style={styles.productImage}
                  contentFit="cover"
                />
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#FBBE21" fill="#FBBE21" />
                  <Text style={styles.ratingText}>
                    {coffee.rating?.toFixed(1) || "4.8"}
                  </Text>
                </View>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{coffee.title}</Text>
                <Text style={styles.productDescription}>
                  {coffee.description}
                </Text>

                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>
                    $ {coffee.price.toFixed(2)}
                  </Text>

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/product/[id]",
                        params: { id: coffee.id },
                      });
                    }}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: Platform.select({ ios: 60, android: 40, web: 20 }),
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  
  headerSubtitle: {
    fontSize: 12,
    color: '#B7B7B7',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
  },
  

  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
    paddingBottom: 100,
  },
  bannerWrapper: {
    marginTop: -10,
    marginBottom: -20,
    zIndex: 100,
    elevation: 10,
  },
  bannerContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 160,
    borderRadius: 16,
    overflow: 'visible',
    position: 'relative',
    zIndex: 100,
    elevation: 10,
    
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'flex-start',
  },
  promoTag: {
    backgroundColor: '#ED5151',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700' as const,
  },
  bannerTextContainer: {
    marginTop: 8,
    gap: 6,
  },
  bannerTitleContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    lineHeight: 38,
    position: 'relative',
    zIndex: 2,
  },
  bannerTitleStripe: {
    position: 'absolute',
    bottom: 4,
    left: 2,
    right: 2,
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 2,
    zIndex: 1,
  },
  categoriesContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#8D8D8D',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  errorBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FEECEC",
  },
  errorText: {
    color: "#8B1A1A",
    fontSize: 12,
    textAlign: "center",
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    width: (width - 56) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700' as const,
  },
  productInfo: {
    padding: 14,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#9B9B9B',
    marginBottom: 12,
    lineHeight: 18,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
topWrapper: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

searchContainer: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#1d1c1cee",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 50,
  },
filterButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
  backgroundColor: "#D17842", 
  justifyContent: "center",
  alignItems: "center",
},
titleWrapper: {
  gap: 8,
},
strip: {
  backgroundColor: "#000000bb",
  paddingHorizontal: 4,
  paddingVertical: 0,       
  borderRadius: 6,
  alignSelf: "flex-start", 
},





 

 



  
});
