import { Product } from '../models/product-page.model';

export const giftingProducts: Product[] = [
  {
    id: 'g1',
    name: 'Luxury Gift Box Set',
    description: 'Curated gift box featuring premium skincare products, chocolates, and a scented candle.',
    price: 199.99,
    images: [
      '/assets/images/gifting/gift-box-1.jpg',
      '/assets/images/gifting/gift-box-2.jpg'
    ],
    category: 'gifting',
    subCategory: 'gift-sets',
    inStock: true,
    rating: 4.9,
    reviews: 42,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'g2',
    name: 'Crystal Wine Decanter Set',
    description: 'Elegant crystal wine decanter with matching glasses, perfect for wine enthusiasts.',
    price: 299.99,
    images: [
      '/assets/images/gifting/decanter-set-1.jpg',
      '/assets/images/gifting/decanter-set-2.jpg'
    ],
    category: 'gifting',
    subCategory: 'home',
    colors: ['Clear'],
    inStock: true,
    rating: 4.8,
    reviews: 28,
    isFeatured: true
  },
  {
    id: 'g3',
    name: 'Artisanal Chocolate Collection',
    description: 'Handcrafted chocolate assortment featuring unique flavors in a luxury presentation box.',
    price: 89.99,
    images: [
      '/assets/images/gifting/chocolate-1.jpg',
      '/assets/images/gifting/chocolate-2.jpg'
    ],
    category: 'gifting',
    subCategory: 'gourmet',
    inStock: true,
    rating: 4.7,
    reviews: 65,
    discount: 10
  },
  {
    id: 'g4',
    name: 'Leather Travel Set',
    description: 'Premium leather travel accessories including passport holder, luggage tag, and card wallet.',
    price: 249.99,
    images: [
      '/assets/images/gifting/travel-set-1.jpg',
      '/assets/images/gifting/travel-set-2.jpg'
    ],
    category: 'gifting',
    subCategory: 'travel',
    colors: ['Brown', 'Black'],
    inStock: true,
    rating: 4.9,
    reviews: 31,
    isNew: true
  },
  {
    id: 'g5',
    name: 'Luxury Stationery Set',
    description: 'Elegant stationery set featuring handcrafted paper, fountain pen, and wax seal.',
    price: 159.99,
    images: [
      '/assets/images/gifting/stationery-1.jpg',
      '/assets/images/gifting/stationery-2.jpg'
    ],
    category: 'gifting',
    subCategory: 'stationery',
    colors: ['Ivory', 'Gray'],
    inStock: true,
    rating: 4.6,
    reviews: 47
  }
];