import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'paypal';
  lastFourDigits?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface EmailPreferences {
  marketing: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  emailPreferences: EmailPreferences;
  loyaltyPoints: number;
  referralCode: string;
  profilePicture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private profile = new BehaviorSubject<UserProfile | null>(null);

  constructor() {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.profile.next(JSON.parse(savedProfile));
    }
  }

  getProfile(): Observable<UserProfile | null> {
    return this.profile.asObservable();
  }

  updateProfile(profile: Partial<UserProfile>): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...profile };
      this.profile.next(updatedProfile);
      this.saveToLocalStorage(updatedProfile);
    }
  }

  addAddress(address: Omit<Address, 'id'>): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      const newAddress = { ...address, id: this.generateId() };
      if (address.isDefault) {
        currentProfile.addresses.forEach(addr => addr.isDefault = false);
      }
      currentProfile.addresses.push(newAddress);
      this.profile.next({ ...currentProfile });
      this.saveToLocalStorage(currentProfile);
    }
  }

  updateAddress(addressId: string, address: Partial<Address>): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      const addressIndex = currentProfile.addresses.findIndex(addr => addr.id === addressId);
      if (addressIndex !== -1) {
        if (address.isDefault) {
          currentProfile.addresses.forEach(addr => addr.isDefault = false);
        }
        currentProfile.addresses[addressIndex] = { 
          ...currentProfile.addresses[addressIndex], 
          ...address 
        };
        this.profile.next({ ...currentProfile });
        this.saveToLocalStorage(currentProfile);
      }
    }
  }

  deleteAddress(addressId: string): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      currentProfile.addresses = currentProfile.addresses.filter(addr => addr.id !== addressId);
      this.profile.next({ ...currentProfile });
      this.saveToLocalStorage(currentProfile);
    }
  }

  addPaymentMethod(method: Omit<PaymentMethod, 'id'>): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      const newMethod = { ...method, id: this.generateId() };
      if (method.isDefault) {
        currentProfile.paymentMethods.forEach(m => m.isDefault = false);
      }
      currentProfile.paymentMethods.push(newMethod);
      this.profile.next({ ...currentProfile });
      this.saveToLocalStorage(currentProfile);
    }
  }

  updatePaymentMethod(methodId: string, method: Partial<PaymentMethod>): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      const methodIndex = currentProfile.paymentMethods.findIndex(m => m.id === methodId);
      if (methodIndex !== -1) {
        if (method.isDefault) {
          currentProfile.paymentMethods.forEach(m => m.isDefault = false);
        }
        currentProfile.paymentMethods[methodIndex] = {
          ...currentProfile.paymentMethods[methodIndex],
          ...method
        };
        this.profile.next({ ...currentProfile });
        this.saveToLocalStorage(currentProfile);
      }
    }
  }

  deletePaymentMethod(methodId: string): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      currentProfile.paymentMethods = currentProfile.paymentMethods.filter(m => m.id !== methodId);
      this.profile.next({ ...currentProfile });
      this.saveToLocalStorage(currentProfile);
    }
  }

  updateEmailPreferences(preferences: Partial<EmailPreferences>): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      currentProfile.emailPreferences = {
        ...currentProfile.emailPreferences,
        ...preferences
      };
      this.profile.next({ ...currentProfile });
      this.saveToLocalStorage(currentProfile);
    }
  }

  addLoyaltyPoints(points: number): void {
    const currentProfile = this.profile.value;
    if (currentProfile) {
      currentProfile.loyaltyPoints += points;
      this.profile.next({ ...currentProfile });
      this.saveToLocalStorage(currentProfile);
    }
  }

  private saveToLocalStorage(profile: UserProfile): void {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
