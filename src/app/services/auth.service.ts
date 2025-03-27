import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for stored user data on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string): Observable<AuthResponse> {
    // Simulate API call with mock data
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      userId: '1',
      email: email,
      expiresIn: 3600
    };

    return of(mockResponse).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        const user: User = {
          id: response.userId,
          email: response.email,
          name: 'John Doe'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: { firstName: string; lastName: string; email: string; phoneNumber: string; password: string }): Observable<AuthResponse> {
    // Simulate API call with mock data
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      userId: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      expiresIn: 3600
    };

    return of(mockResponse).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        const user: User = {
          id: response.userId,
          email: response.email,
          name: 'New User'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}