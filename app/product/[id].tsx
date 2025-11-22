import Colors from '@/constants/colors';
import { CoffeeSize } from '@/types';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Star } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../contexts/CartContext.tsx';
import { coffees } from "../../mock/coffees";

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const coffee = coffees.find(c => c.id === id);
  const [selectedSize, setSelectedSize] = useState<CoffeeSize>('Medium');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleBuyNow = () => {
  router.push({
    pathname: '/buy-now',
    params: {
      coffee: JSON.stringify(coffee),
      size: selectedSize,
    },
  });
};


  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>Coffee not found</Text>
      </View>
    );
  }

  const selectedSizeInfo = coffee.sizes.find(s => s.size === selectedSize);

  const handleAddToCart = () => {
    addToCart(coffee, selectedSize, 1);
    router.back();
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
  {/* Back arrow */}
  <TouchableOpacity 
    style={styles.iconButton} 
    onPress={() => router.back()}
  >
    <ArrowLeft size={24} color="#494441ff" />
  </TouchableOpacity>

  {/* Center text */}
  <Text style={styles.topBarTitle}>Details</Text>

  {/* Favorite heart */}
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
            source={coffee.image}
            style={styles.image}
            contentFit="cover"
          />
          
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#2F2D2C" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                color={isFavorite ? "#ED5151" : "#2F2D2C"}
                fill={isFavorite ? "#ED5151" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{coffee.name}</Text>
              <Text style={styles.subtitle}>{coffee.description}</Text>
            </View>
            
          </View>
            <View style={styles.ratingSection}>
              <Star size={20} color="#FBBE21" fill="#FBBE21" />
              <Text style={styles.rating}>{coffee.rating}</Text>
              <Text style={styles.reviews}>({coffee.reviews})</Text>
            </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            A {coffee.name.toLowerCase()} is a coffee drink made with espresso and steamed milk. 
            {coffee.description.includes('Chocolate') && ' Rich chocolate flavor blended perfectly with our premium coffee beans.'}
            {coffee.description.includes('Oat') && ' Made with sustainable oat milk for a creamy, dairy-free experience.'}
            {!coffee.description.includes('Chocolate') && !coffee.description.includes('Oat') && ' Crafted with care using only the finest ingredients.'}
          </Text>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {coffee.sizes.map(size => (
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
                  {size.size.charAt(0)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>$ {selectedSizeInfo?.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleBuyNow}>
  <Text style={styles.addToCartText}>Buy Now</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: width,
    height: width,
    borderRadius:20,
    
    position: 'relative',
 
    

 
    
  },
  image: {
    width: '90%',
    height: '50%',
    alignSelf:'center',
    marginTop:150,
     borderRadius: 20,    
   
   
  },
  topBar: {
    
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 50, web: 20 }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.light.card,
    paddingHorizontal: 1,
    paddingVertical: 0,
    borderRadius: 12,
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.light.text,
  },
  reviews: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.light.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#9B9B9B',
    lineHeight: 22,
    marginBottom: 24,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  sizeButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
  },
  sizeButtonActive: {
    backgroundColor: "#f9e1d0ff",
    borderColor: Colors.light.primary,
  },
  sizeButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#9B9B9B',
  },
  sizeButtonTextActive: {
    color: Colors.light.primary,
    fontWeight: '700' as const,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.select({ ios: 34, android: 20, web: 20 }),
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    gap: 16,
  },
  priceSection: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#9B9B9B',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.light.primary,
  },

  addToCartButton: {
  width: 200,
  height: 56,
  backgroundColor: Colors.light.primary,
  borderRadius: 16,
  marginHorizontal:82,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
},

  addToCartText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },

  topBar: {
  position: 'absolute',
  top: Platform.select({ ios: 60, android: 50, web: 20 }),
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  zIndex: 10,
},
iconButton: {
  width: 44,
  height: 44,
  borderRadius: 22, // circular button
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  justifyContent: 'center',
  alignItems: 'center',
},

topBarTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#2F2D2C',
},



});
