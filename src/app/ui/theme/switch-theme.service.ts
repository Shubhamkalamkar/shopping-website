import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwitchThemeService {
  private readonly THEME_KEY = 'isDarkTheme';
  private themeSlider: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.getInitialThemeState()
  );

  constructor() {}

  setLoaderState(state: boolean): void {
    this.themeSlider.next(state);
    localStorage.setItem(this.THEME_KEY, JSON.stringify(state)); // Save to local storage
  }

  getLoaderState(): Observable<boolean> {
    return this.themeSlider.asObservable();
  }

  private getInitialThemeState(): boolean {
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    // Parse stored theme (if any) or return default (true)
    return storedTheme ? JSON.parse(storedTheme) : true;
  }
}
