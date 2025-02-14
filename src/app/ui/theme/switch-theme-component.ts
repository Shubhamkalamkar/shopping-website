// my-component.ts
import { Component, OnInit } from '@angular/core';
import { SwitchThemeService } from './switch-theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-switch-theme',
  imports: [MatIconModule],
  standalone: true,
  template: `
    <div class="toggles">
      <mat-icon color="primary" (click)="toggleTheme()"
        >{{ !themeType ? 'light_mode' : 'dark_mode' }}
      </mat-icon>
    </div>
  `,
  styles: `
    .toggles{
      text-align:center;
      width:100%;
      justify-content:center;
      display:flex;
      align-items:center;
      padding:1rem 0;
      cursor:pointer;
    }
  `,
})
export class SwitchThemeComponent implements OnInit {
  themeType: any;
  constructor(private switchTheme: SwitchThemeService) {}

  ngOnInit(): void {
    Promise.resolve().then(() =>
      this.switchTheme.getLoaderState().subscribe((state: boolean) => {
        this.themeType = state;
      })
    );
  }
  toggleTheme() {
    this.themeType = !this.themeType;
    this.switchTheme.setLoaderState(this.themeType);
    localStorage.setItem('theme', this.themeType);
  }
}
