import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  slides = [
    {
      id: 1,
      image: 'assets/images/slider/slide1.jpg',
      title: 'New Arrivals',
      subtitle: 'Check out our latest collection',
      active: true
    },
    {
      id: 2,
      image: 'assets/images/slider/slide2.jpg',
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on summer collection',
      active: false
    },
    {
      id: 3,
      image: 'assets/images/slider/slide3.jpg',
      title: 'Winter Collection',
      subtitle: 'Prepare for winter with our latest styles',
      active: false
    }
  ];

  categories = [
    {
      id: 1,
      name: 'Men',
      image: 'assets/images/categories/men.jpg',
      description: 'Shop Men\'s Fashion'
    },
    {
      id: 2,
      name: 'Women',
      image: 'assets/images/categories/women.jpg',
      description: 'Shop Women\'s Fashion'
    },
    {
      id: 3,
      name: 'Kids',
      image: 'assets/images/categories/kids.jpg',
      description: 'Shop Kids\' Fashion'
    }
  ];

  trendingProducts = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      image: 'assets/images/products/product1.jpg',
      category: 'Men'
    },
    {
      id: 2,
      name: 'Summer Floral Dress',
      price: 59.99,
      image: 'assets/images/products/product2.jpg',
      category: 'Women'
    },
    {
      id: 3,
      name: 'Kids Denim Jacket',
      price: 39.99,
      image: 'assets/images/products/product3.jpg',
      category: 'Kids'
    },
    {
      id: 4,
      name: 'Casual Sneakers',
      price: 79.99,
      image: 'assets/images/products/product4.jpg',
      category: 'Men'
    }
  ];

  currentSlide = 0;

  ngOnInit() {
    this.startSlideshow();
  }

  private startSlideshow() {
    setInterval(() => {
      this.slides.forEach(slide => slide.active = false);
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.slides[this.currentSlide].active = true;
    }, 5000);
  }

  addToCart(productId: number) {
    // TODO: Implement add to cart functionality
    console.log('Adding product to cart:', productId);
  }

  addToWishlist(productId: number) {
    // TODO: Implement add to wishlist functionality
    console.log('Adding product to wishlist:', productId);
  }
}
