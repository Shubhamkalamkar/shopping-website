import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);

  getToasts(): Observable<ToastMessage | null> {
    return this.toastSubject.asObservable();
  }

  show(toast: ToastMessage): void {
    this.toastSubject.next(toast);
    setTimeout(() => {
      if (this.toastSubject.value === toast) {
        this.toastSubject.next(null);
      }
    }, 3000);
  }

  success(message: string): void {
    this.show({ message, type: 'success' });
  }

  error(message: string): void {
    this.show({ message, type: 'error' });
  }

  info(message: string): void {
    this.show({ message, type: 'info' });
  }

  warning(message: string): void {
    this.show({ message, type: 'warning' });
  }

  clear(): void {
    this.toastSubject.next(null);
  }
}
