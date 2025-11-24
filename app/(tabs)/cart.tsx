import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    const [primaryItem] = cart;

    router.push({
      pathname: "/buy-now",
      params: {
        product: JSON.stringify(primaryItem.coffee),
        size: primaryItem.size,
      },
    });
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Cart',
            headerStyle: {
              backgroundColor: Colors.light.card,
            },
          }} 
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Cart',
          headerStyle: {
            backgroundColor: Colors.light.card,
          },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cart.map((item, index) => (
          <View
            key={`${item.coffee.id}-${item.size}-${index}`}
            style={styles.cartItem}
          >
            <Image
              source={{ uri: item.coffee.image }}
              style={styles.itemImage}
              contentFit="cover"
            />
            
            <View style={styles.itemDetails}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.coffee.title ?? item.coffee.name}
                  </Text>
                  <Text style={styles.itemDescription}>
                    {item.coffee.description ?? "Freshly brewed coffee."}
                  </Text>
                  <Text style={styles.itemSize}>Size: {item.size}</Text>
                </View>
                
                <TouchableOpacity
                  onPress={() => removeFromCart(item.coffee.id, item.size)}
                  style={styles.deleteButton}
                >
                  <Trash2 size={18} color="#ED5151" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>
                  $ {(item.price * item.quantity).toFixed(2)}
                </Text>
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.coffee.id, item.size, item.quantity - 1)}
                  >
                    <Minus size={16} color={Colors.light.text} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.coffee.id, item.size, item.quantity + 1)}
                  >
                    <Plus size={16} color={Colors.light.text} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearCart}
        >
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>$ {total.toFixed(2)}</Text>
        </View>
      
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    marginTop:80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#9B9B9B',
    marginBottom: 24,
  },
  shopButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.light.text,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  deleteButton: {
    padding: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.light.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.light.text,
    minWidth: 24,
    textAlign: 'center',
  },
  clearButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ED5151',
    alignItems: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#ED5151',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.select({ ios: 34, android: 20, web: 20 }),
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.light.text,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.light.primary,
  },
  checkoutButton: {
    height: 56,
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
});