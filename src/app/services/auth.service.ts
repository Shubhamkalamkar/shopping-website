import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check local storage for auth token on initialization
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(email: string, password: string): Promise<boolean> {
    // Implement actual login logic here
    return new Promise((resolve) => {
      // Simulated login success
      localStorage.setItem('auth_token', 'dummy_token');
      this.isAuthenticatedSubject.next(true);
      resolve(true);
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
