import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoaderState(state: boolean): void {
    this.loaderSubject.next(state);
  }

  getLoaderState(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }
}
