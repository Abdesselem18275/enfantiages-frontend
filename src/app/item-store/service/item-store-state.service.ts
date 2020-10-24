import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { Item} from '../../core/models/item-models';
@Injectable({
  providedIn: 'root'
})
export class ItemStoreStateService {
  private _selectedItemsSubject = new BehaviorSubject<Item[]>([])
  private _items = new BehaviorSubject<Item[]>([])
  constructor(private ads : AppDataService ,private route : ActivatedRoute) {

  
  }
  setSelectedItems(items:Item[]):void {
    this._selectedItemsSubject.next(items)
  }
  get selectedItems():Observable<Item[]> {
    return this._selectedItemsSubject.asObservable()
  }
  get items(): Observable<Item[]> {
     return  this.route.queryParamMap.pipe(
      debounceTime(200),
      switchMap((paramMap:ParamMap ) => this.ads.get<Item[]>('items/',paramMap)))
  }
  get ItemsCount():Observable<number> {
    return this.items.pipe(
      map((items:Item[]) => items.length))
  }

}
