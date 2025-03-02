import { Product } from '../models/product-page.model';

export const womenProducts: Product[] = [
  {
    id: 'w1',
    name: 'Silk Blend Wrap Dress',
    description: 'Elegant wrap dress crafted from luxurious silk blend fabric, featuring a flattering V-neckline and adjustable waist tie.',
    price: 299.99,
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg'
    ],
    category: 'women',
    subCategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'w2',
    name: 'Cashmere Turtleneck Sweater',
    description: 'Premium cashmere sweater with a classic turtleneck design, perfect for elegant casual wear.',
    price: 249.99,
    images: [
      'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg',
      'https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg'
    ],
    category: 'women',
    subCategory: 'sweaters',
    sizes: ['S', 'M', 'L'],
    colors: ['Cream', 'Gray', 'Camel'],
    inStock: true,
    rating: 4.9,
    reviews: 89,
    discount: 15
  },
  {
    id: 'w3',
    name: 'Tailored Wool Blazer',
    description: 'Sophisticated wool blazer with a tailored fit, perfect for both office wear and evening occasions.',
    price: 399.99,
    images: [
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
      'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg'
    ],
    category: 'women',
    subCategory: 'jackets',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Gray'],
    inStock: true,
    rating: 4.7,
    reviews: 56,
    isFeatured: true
  },
  {
    id: 'w4',
    name: 'High-Waisted Palazzo Pants',
    description: 'Elegant high-waisted palazzo pants in flowing fabric, perfect for a sophisticated look.',
    price: 189.99,
    images: [
      '/assets/images/women/palazzo-pants-1.jpg',
      '/assets/images/women/palazzo-pants-2.jpg'
    ],
    category: 'women',
    subCategory: 'pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'White'],
    inStock: true,
    rating: 4.6,
    reviews: 78,
    isNew: true
  },
  {
    id: 'w5',
    name: 'Silk Blouse',
    description: 'Classic silk blouse with a relaxed fit and hidden button placket.',
    price: 179.99,
    images: [
      '/assets/images/women/silk-blouse-1.jpg',
      '/assets/images/women/silk-blouse-2.jpg'
    ],
    category: 'women',
    subCategory: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Blush', 'Black'],
    inStock: true,
    rating: 4.8,
    reviews: 92
  }
];