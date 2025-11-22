import Colors from '@/constants/colors';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ChevronDown, Search, SlidersHorizontal, Star } from 'lucide-react-native';
import { useState } from 'react';


import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { categories, coffees } from '../../mock/coffees';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const filteredCoffees = coffees.filter(coffee => {
    const matchesCategory = selectedCategory === 'All' || coffee.category === selectedCategory;
    const matchesSearch = coffee.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  <TouchableOpacity onPress={() => console.log("Location dropdown pressed")}>
    <ChevronDown size={18} color="#f3efecff" />
  </TouchableOpacity>
</View>

          </View>
         
        </View>

        <View style={styles.topWrapper}>
  {/* Search Bar */}
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

  {/* Separate Filter Button */}
  <TouchableOpacity style={styles.filterButton} onPress={() => console.log("Filter pressed")}>
    <SlidersHorizontal size={20} color="#FFFFFF" />
  </TouchableOpacity>
</View>

      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.bannerWrapper}>
  <View style={styles.bannerContainer}>
    <Image
      source="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
      style={styles.banner}
      contentFit="cover"
    />

   <LinearGradient
  colors={['rgba(0,0,0,0.6)', 'transparent']}
  style={styles.bannerGradient}
>
  <View style={styles.promo}>
    <Text style={styles.promoLabel}>Promo</Text>
  </View>

  <View style={styles.titleWrapper}>
  <View style={styles.strip}>
    <Text style={styles.bannerTitle}>Buy one get</Text>
  </View>

  <View style={styles.strip}>
    <Text style={styles.bannerTitle}>one FREE</Text>
  </View>
</View>



</LinearGradient>

  </View>
</View>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsGrid}>
          {filteredCoffees.map(coffee => (
            <TouchableOpacity
              key={coffee.id}
              style={styles.productCard}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: coffee.id } })}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={coffee.image}
                  style={styles.productImage}
                  contentFit="cover"
                />
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#FBBE21" fill="#FBBE21" />
                  <Text style={styles.ratingText}>{coffee.rating}</Text>
                </View>
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{coffee.name}</Text>
                <Text style={styles.productDescription}>{coffee.description}</Text>
                
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>$ {coffee.price.toFixed(2)}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({ pathname: '/product/[id]', params: { id: coffee.id } });
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
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingTop: Platform.select({ ios: 90, android: 50, web: 20 }),
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  
  headerSubtitle: {
    fontSize: 12,
    color: '#B7B7B7',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: 14,
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
    paddingBottom: 100,
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'flex-start',
  },
  promo: {
    backgroundColor: '#ED5151',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  promoLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700' as const,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    backgroundAttachment:"#000000ee",
    lineHeight: 38,
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
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    width: (width - 56) / 2,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 132,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
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
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 12,
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
    width: 32,
    height: 32,
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
  borderRadius: 12,
  paddingHorizontal: 18,
  paddingVertical: 10,
  height: 52,
},


filterButton: {
  width: 48,
  height: 48,
  borderRadius: 12,
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
