import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from 'src/app/app.config';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { Item, ItemState} from '../../core/models/item-models';
import {PaginatedResponseType} from '../../core/models/shared';
@Injectable({
  providedIn: 'root'
})
export class ItemStoreStateService {
  private _selectedItemsSubject = new BehaviorSubject<Item[]>([])
  private _itemsSubject = new BehaviorSubject<Item[]>([])
  private _itemsCountSubject = new BehaviorSubject<number>(0)
  private itemsColumnsSubjects = new BehaviorSubject<string[]>([])
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private ads : AppDataService ,private route : ActivatedRoute) {
    this.route.queryParamMap.pipe(
      debounceTime(300),
      tap((paramMap:ParamMap ) => {
        const baseDisplayedColumns = ['select','deposition_date','deposer','reference','category','gender']
        const activeStatus = paramMap.has(this.appConfig.itemStateQueryParamKey) ? paramMap.get(this.appConfig.itemStateQueryParamKey) as ItemState: ItemState.ALL
        this.setItemsColumns(activeStatus === ItemState.SOLD ? 
        baseDisplayedColumns.concat(['actual_sale_price','buyer','sale_date','action']) : 
        baseDisplayedColumns.concat(['size','brand','initial_sale_price','state','action']))
      }),
      switchMap((paramMap:ParamMap ) => this.ads.get<PaginatedResponseType<Item>>('items/',paramMap)
      )).subscribe(response => {
        this.setItems(response.results)
        this.setItemsCount(response.count)
      })
  
  }

  setItemsColumns(payload : string[]):void {
    this.itemsColumnsSubjects.next(payload)
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
  deleteItem(id:number):void {
    const items : Item[] = this._itemsSubject.getValue().filter(item => item.id !== id)
    this.setItems(items)
    this.setItemsCount(this._itemsCountSubject.getValue()-1)
  }
  get selectedItems():Observable<Item[]> {
    return this._selectedItemsSubject.asObservable()
  }
  get itemsColumns():Observable<string[]> {
    return this.itemsColumnsSubjects.asObservable()
  }
  get items(): Observable<Item[]> {
    return this._itemsSubject.asObservable()
  }
  get ItemsCount():Observable<number> {
    return this._itemsCountSubject.asObservable()
  }

}
