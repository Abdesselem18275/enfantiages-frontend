import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private _isLoading = new BehaviorSubject<boolean>(false)

  constructor() { }
  setIsLoading(state : boolean) {
    this._isLoading.next(state)
  }
  get isLoading():Observable<boolean> {
    return this._isLoading.asObservable()
  }
}
