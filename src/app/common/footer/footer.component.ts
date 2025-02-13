import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { icon: 'fab fa-facebook', url: '#' },
    { icon: 'fab fa-twitter', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-pinterest', url: '#' }
  ];

  quickLinks = [
    { text: 'About Us', url: '/about' },
    { text: 'Contact', url: '/contact' },
    { text: 'FAQs', url: '/faqs' },
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms & Conditions', url: '/terms' }
  ];

  categories = [
    { text: 'Men', url: '/men' },
    { text: 'Women', url: '/women' },
    { text: 'Kids', url: '/kids' },
    { text: 'Accessories', url: '/accessories' },
    { text: 'New Arrivals', url: '/new-arrivals' }
  ];
}
