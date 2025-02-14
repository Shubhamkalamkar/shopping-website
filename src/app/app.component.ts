import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SwitchThemeService } from './ui/theme/switch-theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shopping-management-portal';
  isDark: boolean = true;
  constructor(private switchTheme: SwitchThemeService) {
    Promise.resolve().then(() =>
      this.switchTheme.getLoaderState().subscribe((state: boolean) => {
        this.isDark = state;
        if (this.isDark) {
          //dark theme if true
          document.body.classList.add('dark');
          document.documentElement.style.setProperty(
            '--primary-color',
            '#004552'
          );
          document.documentElement.style.setProperty(
            '--secondary-color',
            '#92e5fc'
          );
          document.documentElement.style.setProperty(
            '--tertiary-color',
            '#016375'
          );
          document.documentElement.style.setProperty(
            '--selective-whtie-color',
            '#232629'
          );
          document.documentElement.style.setProperty(
            '--selective-text-color',
            '#ffffff'
          );
          document.documentElement.style.setProperty(
            '--primary-dark',
            '#2c3133'
          );
        } else {
          document.body.classList.remove('dark');
          document.documentElement.style.setProperty(
            '--primary-color',
            '#31a6c0'
          );
          document.documentElement.style.setProperty(
            '--secondary-color',
            '#016482'
          );
          document.documentElement.style.setProperty(
            '--tertiary-color',
            '#2c3133'
          );
          document.documentElement.style.setProperty(
            '--selective-whtie-color',
            '#ffffff'
          );
          document.documentElement.style.setProperty(
            '--selective-text-color',
            '#232629'
          );
          document.documentElement.style.setProperty(
            '--primary-dark',
            '#004552'
          );
        }
      })
    );
  }
}
