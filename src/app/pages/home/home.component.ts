import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  totalSlides = 7;
  slideInterval: any;

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    this.stopSlideShow();
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopSlideShow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlidePosition();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlidePosition();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const slides = document.querySelector('.slides') as HTMLElement;
    if (slides) {
      const translateX = -(this.currentSlide * (100 / this.totalSlides));
      slides.style.transform = `translateX(${translateX}%)`;
    }
  }

  onSlideMouseEnter() {
    this.stopSlideShow();
  }

  onSlideMouseLeave() {
    this.startSlideShow();
  }
}
