import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item} from '../../core/models/item-models';
@Injectable({
  providedIn: 'root'
})
export class ItemStoreStateService {
  private _selectedItemsSubject = new BehaviorSubject<Item[]>([])

  setSelectedItems(items:Item[]):void {
    this._selectedItemsSubject.next(items)
  }
  get selectedItems():Observable<Item[]> {
    return this._selectedItemsSubject.asObservable()
  }

  constructor() { }
}
