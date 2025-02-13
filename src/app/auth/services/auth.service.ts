import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check local storage for auth token on initialization
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
    this.loadUser();
  }

  private loadUser(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Promise<boolean> {
    // Implement actual login logic here
    return new Promise((resolve) => {
      // Simulated successful login
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'dummy_token');
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      resolve(true);
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
