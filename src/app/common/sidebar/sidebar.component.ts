import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('sidebarState', [
      state('closed', style({
        transform: 'translateX(-100%)',
        visibility: 'hidden',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateX(0)',
        visibility: 'visible',
        opacity: 1
      })),
      transition('closed => open', [
        style({ visibility: 'visible' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('open => closed', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          transform: 'translateX(-100%)',
          opacity: 0
        })),
        style({ visibility: 'hidden' })
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen = false;
  private subscription: Subscription | undefined;

  readonly categories = [
    { id: 'men', name: 'MEN', icon: 'person', description: 'Shop Men\'s Collection', comingSoon: false },
    { id: 'women', name: 'WOMEN', icon: 'person_outline', description: 'Shop Women\'s Collection', comingSoon: false },
    { id: 'kids', name: 'KIDS', icon: 'child_care', description: 'Shop Kids\' Collection', comingSoon: false },
    { id: 'accessories', name: 'ACCESSORIES', icon: 'watch', description: 'Shop Accessories Collection', comingSoon: false },
    { id: 'gifting', name: 'GIFTING', icon: 'card_giftcard', description: 'Shop Gifting Collection', comingSoon: false },
    { id: 'footwear', name: 'FOOTWEAR', icon: 'hiking', description: 'Shop Footwear Collection', comingSoon: false },
    { id: 'accessories', name: 'ACCESSORIES', icon: 'diamond', description: 'Shop Accessories', comingSoon: false },
    { id: 'gifting', name: 'GIFTING', icon: 'card_giftcard', description: 'Shop Gift Items', comingSoon: false }
  ];

  constructor(
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.subscription = this.sidebarService.isOpen$.subscribe(
      isOpen => {
        this.isOpen = isOpen;
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }
    );
  }

  close() {
    this.isOpen = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      document.body.style.overflow = 'auto';
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  navigateToCategory(category: string) {
    if (!this.categories.find(c => c.id === category)?.comingSoon) {
      this.router.navigate(['/products', category]);
      this.sidebarService.closeSidebar();
    }
  }

  getAnimationState() {
    return this.isOpen ? 'open' : 'closed';
  }
}