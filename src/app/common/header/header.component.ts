import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SwitchThemeComponent } from '../../ui/theme/switch-theme-component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, SwitchThemeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuButtonClicked = output();
  constructor() {}
  onMenuClicked = () => {
    this.menuButtonClicked.emit();
  };
}
