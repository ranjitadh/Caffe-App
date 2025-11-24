export type CoffeeSize = "small" | "medium" | "large";

type CoffeeSizeOption = {
  size: string;
  price: number;
};

export type CoffeeSizes =
  | Record<string, number>
  | CoffeeSizeOption[];

export interface Coffee {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  category_id?: string | number;
  rating?: number;
  reviews?: number;
  sizes: CoffeeSizes;
}

export interface CartItem {
  coffee: Coffee;
  size: CoffeeSize;
  quantity: number;
  price: number;
}

export interface Category {
  id: string | number;
  title?: string;
  name?: string;
  icon?: string;
}

export type DeliveryMethod = "Deliver" | "Pickup";
