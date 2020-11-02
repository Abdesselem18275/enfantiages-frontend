import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { Item} from '../../core/models/item-models';
import {PaginatedResponseType} from '../../core/models/shared';
@Injectable({
  providedIn: 'root'
})
export class ItemStoreStateService {
  private _selectedItemsSubject = new BehaviorSubject<Item[]>([])
  private _itemsSubject = new BehaviorSubject<Item[]>([])
  private _itemsCountSubject = new BehaviorSubject<number>(0)

  constructor(private ads : AppDataService ,private route : ActivatedRoute) {
    this.route.queryParamMap.pipe(
      debounceTime(300),
      switchMap((paramMap:ParamMap ) => this.ads.get<PaginatedResponseType<Item>>('items/',paramMap)
      )).subscribe(response => {
        this.setItems(response.results)
        this.setItemsCount(response.count)
      })
  
  }
  setSelectedItems(items:Item[]):void {
    this._selectedItemsSubject.next(items)
  }
  setItems(items:Item[]):void {
    this._itemsSubject.next(items)
  }
  setItemsCount(count:number):void {
    this._itemsCountSubject.next(count)
  }
  get selectedItems():Observable<Item[]> {
    return this._selectedItemsSubject.asObservable()
  }
  get items(): Observable<Item[]> {
    return this._itemsSubject.asObservable()
  }
  get ItemsCount():Observable<number> {
    return this._itemsCountSubject.asObservable()
  }

}
