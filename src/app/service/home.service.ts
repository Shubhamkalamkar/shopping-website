import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();
  constructor() { }

  toggleIsOpen(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}
