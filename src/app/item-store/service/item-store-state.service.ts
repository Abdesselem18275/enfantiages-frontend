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
  constructor(private ads : AppDataService ,private route : ActivatedRoute) {

  
  }
  setSelectedItems(items:Item[]):void {
    this._selectedItemsSubject.next(items)
  }
 
  get selectedItems():Observable<Item[]> {
    return this._selectedItemsSubject.asObservable()
  }
  private itemsRawResponse():Observable<PaginatedResponseType<Item>> {
    return  this.route.queryParamMap.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((paramMap:ParamMap ) => this.ads.get<PaginatedResponseType<Item>>('items/',paramMap)
      ))
  }
  get items(): Observable<Item[]> {
    return this.itemsRawResponse().pipe(map(response => response.results))
  }
  get ItemsCount():Observable<number> {
    return this.itemsRawResponse().pipe(map(response => response.count))
  }

}
