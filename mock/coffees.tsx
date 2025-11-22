import Image from "@/assets/images/Image.png";
import { Category, Coffee } from "@/types";

export const categories: Category[] = [
  { id: '1', name: 'All', icon: '☕' },
  { id: '2', name: 'Cappuccino', icon: '☕' },
  { id: '3', name: 'Latte', icon: '☕' },
  { id: '4', name: 'Americano', icon: '☕' },
  { id: '5', name: 'Expressso', icon: '☕' },
];

export const coffees: Coffee[] = [
  {
    id: '1',
    name: 'Caffe Mocha',
    description: 'Deep Form',
    price: 4.53,
    image: Image,
    category: 'Cappuccino',
    rating: 4.8,
    reviews: 230,
    sizes: [
      { size: 'Small', price: 4.53 },
      { size: 'Medium', price: 5.53 },
      { size: 'Large', price: 6.53 },
    ],
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'with Oat Milk',
    price: 3.90,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
    category: 'Cappuccino',
    rating: 4.9,
    reviews: 180,
    sizes: [
      { size: 'Small', price: 3.90 },
      { size: 'Medium', price: 4.90 },
      { size: 'Large', price: 5.90 },
    ],
  },
  {
    id: '3',
    name: 'Caffè Latte',
    description: 'with Steamed Milk',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80',
    category: 'Latte',
    rating: 4.7,
    reviews: 150,
    sizes: [
      { size: 'Small', price: 4.20 },
      { size: 'Medium', price: 5.20 },
      { size: 'Large', price: 6.20 },
    ],
  },
  {
    id: '4',
    name: 'Flat White',
    description: 'with Microfoam',
    price: 4.10,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80',
    category: 'Latte',
    rating: 4.6,
    reviews: 120,
    sizes: [
      { size: 'Small', price: 4.10 },
      { size: 'Medium', price: 5.10 },
      { size: 'Large', price: 6.10 },
    ],
  },
  {
    id: '5',
    name: 'Espresso',
    description: 'Rich & Intense',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80',
    category: 'Espresso',
    rating: 4.9,
    reviews: 300,
    sizes: [
      { size: 'Small', price: 3.50 },
      { size: 'Medium', price: 4.50 },
      { size: 'Large', price: 5.50 },
    ],
  },
  {
    id: '6',
    name: 'Americano',
    description: 'with Hot Water',
    price: 3.80,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    category: 'Americano',
    rating: 4.5,
    reviews: 95,
    sizes: [
      { size: 'Small', price: 3.80 },
      { size: 'Medium', price: 4.80 },
      { size: 'Large', price: 5.80 },
    ],
  },
];
