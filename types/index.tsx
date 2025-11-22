export type CoffeeSize = 'Small' | 'Medium' | 'Large';

export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sizes: {
    size: CoffeeSize;
    price: number;
  }[];
}

export interface CartItem {
  coffee: Coffee;
  size: CoffeeSize;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
