import { CoffeeSize, DeliveryMethod } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function BuyNowScreen() {
  const { product: productParam, size: sizeParam } = useLocalSearchParams();

  // Convert product back to object
  const product = JSON.parse(productParam as string);

  // Convert sizes object → array
  const sizeOptions = Object.entries(product.sizes).map(([size, price]) => ({
    size,
    price,
  }));

  // Default selected size
  const initialSize = (sizeParam as CoffeeSize) || "medium";

  // Default price
  const initialPrice =
    sizeOptions.find(
      (s: any) =>
        s.size.toLowerCase() === initialSize.toString().toLowerCase()
    )?.price || 0;

  // STATES
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [price, setPrice] = useState(initialPrice);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("Deliver");

  // Update price when size changes
  useEffect(() => {
    const newPrice =
      sizeOptions.find(
        (s: any) =>
          s.size.toLowerCase() === selectedSize.toString().toLowerCase()
      )?.price || 0;

    setPrice(newPrice);
  }, [selectedSize, sizeOptions]);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* IMAGE */}
      <Image
        source={{ uri: product.image }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      {/* TITLE */}
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{product.title}</Text>

      {/* DESCRIPTION */}
      <Text style={{ marginVertical: 10, fontSize: 15, color: "#555" }}>
        {product.description}
      </Text>

      {/* SIZE SELECTOR */}
      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "600" }}>
        Select Size
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {sizeOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedSize(item.size)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 12,
              marginRight: 10,
              backgroundColor:
                selectedSize.toLowerCase() === item.size.toLowerCase()
                  ? "#000"
                  : "#eee",
            }}
          >
            <Text
              style={{
                color:
                  selectedSize.toLowerCase() === item.size.toLowerCase()
                    ? "#fff"
                    : "#000",
              }}
            >
              {item.size.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* DELIVERY METHOD */}
      <Text style={{ marginTop: 25, fontSize: 18, fontWeight: "600" }}>
        Delivery Method
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {["Deliver", "Pickup"].map((method) => (
          <TouchableOpacity
            key={method}
            onPress={() => setDeliveryMethod(method as DeliveryMethod)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 12,
              marginRight: 10,
              backgroundColor:
                deliveryMethod === method ? "#000" : "#eee",
            }}
          >
            <Text
              style={{
                color: deliveryMethod === method ? "#fff" : "#000",
              }}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PRICE + BUY BUTTON */}
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          ${price.toFixed(2)}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
