import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

interface Product {
  primaryImage: string;
  hoverImage: string;
  title: string;
  price: number;
  discountPrice: number;
  discount: number;
  category: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = [
    {
      primaryImage: 'https://cdn1.staticans.com/image/data/Vastrado/07feb25/MS6797A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      hoverImage: 'https://cdn1.staticans.com/image/catalog/vastrado/product/MS5824A/MS5824A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      title: 'Mens Casual Shirt',
      price: 1999,
      discountPrice: 1499,
      discount: 25,
      category: 'mens'
    },
    {
      primaryImage: 'https://cdn1.staticans.com/image/data/Vastrado/07feb25/MS6797A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      hoverImage: 'https://cdn1.staticans.com/image/catalog/vastrado/product/MS5824A/MS5824A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      title: 'Mens Casual Shirt',
      price: 1999,
      discountPrice: 1499,
      discount: 25,
      category: 'mens'
    },
    {
      primaryImage: 'https://cdn1.staticans.com/image/data/Vastrado/07feb25/MS6797A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      hoverImage: 'https://cdn1.staticans.com/image/catalog/vastrado/product/MS5824A/MS5824A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      title: 'Mens Casual Shirt',
      price: 1999,
      discountPrice: 1499,
      discount: 25,
      category: 'mens'
    },
    {
      primaryImage: 'https://cdn1.staticans.com/image/data/Vastrado/07feb25/MS6797A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      hoverImage: 'https://cdn1.staticans.com/image/catalog/vastrado/product/MS5824A/MS5824A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      title: 'Mens Casual Shirt',
      price: 1999,
      discountPrice: 1499,
      discount: 25,
      category: 'mens'
    },
    {
      primaryImage: 'https://cdn1.staticans.com/image/data/Vastrado/07feb25/MS6797A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      hoverImage: 'https://cdn1.staticans.com/image/catalog/vastrado/product/MS5824A/MS5824A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      title: 'Mens Casual Shirt',
      price: 1999,
      discountPrice: 1499,
      discount: 25,
      category: 'mens'
    },
    {
      primaryImage: 'https://cdn1.staticans.com/image/data/Vastrado/07feb25/MS6797A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      hoverImage: 'https://cdn1.staticans.com/image/catalog/vastrado/product/MS5824A/MS5824A_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
      title: 'Mens Casual Shirt',
      price: 1999,
      discountPrice: 1499,
      discount: 25,
      category: 'mens'
    },
  ];
}
