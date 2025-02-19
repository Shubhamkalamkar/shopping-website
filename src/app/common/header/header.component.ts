import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SwitchThemeComponent } from '../../ui/theme/switch-theme-component';
import { HomeService } from '../../service/home.service';

interface Country {
  name: string;
  currency: string;
  code: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, SwitchThemeComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpen: boolean = false;

  constructor(private homeService: HomeService) {
    this.homeService.isOpen$.subscribe(value => {
      this.isOpen = value;
    });
  }

  isCountryPopupOpen = false;
  selectedCountry: Country = {
    name: 'India',
    currency: 'INR ₹',
    code: 'IN'
  };

  countries: Country[] = [
    {
      name: 'India',
      currency: 'INR ₹',
      code: 'IN'
    },
    {
      name: 'United States',
      currency: 'USD $',
      code: 'US'
    },
    {
      name: 'United Kingdom',
      currency: 'GBP £',
      code: 'GB'
    }
  ];

  onMenuClicked() {
    console.log('Menu clicked');
    this.homeService.toggleIsOpen();
  }

  toggleCountryPopup() {
    this.isCountryPopupOpen = !this.isCountryPopupOpen;
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.isCountryPopupOpen = false;
  }
}
