export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
  color: string;
  size: string;
  inStock: boolean;
  onSale: boolean;
  tags: string[];
  specifications: {
    [key: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
