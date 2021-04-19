import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Item, ItemState} from '../../../core/models/item-models';
import {DialogHandlerService} from '../../../shared/service/dialog-handler.service'
import {ItemStoreStateService} from '../../service/item-store-state.service'

import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { Sort } from '@angular/material/sort';
import {AppConfig, APP_CONFIG } from '../../../app.config'
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnDestroy  {
  items$ : Observable<Item[]>
  itemState = ItemState
  selection:SelectionModel<Item>
  itemsCounts$: Observable<number>
  activeItemState$ : Observable<ItemState>
  @Output() selectedItems = new EventEmitter<Item[]>();
  displayedColumns$: Observable<string[]>
  baseDisplayedColumns = ['select','deposition_date','deposer','reference','category','gender']
  itemsDataSource = new MatTableDataSource<Item>();
  private subscribtion : Subscription
  constructor(
    private router : Router,
    private route : ActivatedRoute,  
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private dhs: DialogHandlerService,
    private iss: ItemStoreStateService) {
      this.items$ = iss.items
      const initialSelection = [];
      const allowMultiSelect = true;
      this.subscribtion = this.items$.subscribe(items => {this.itemsDataSource.data = items})
      this.selection = new SelectionModel<Item>(allowMultiSelect, initialSelection);
      this.itemsCounts$ = this.iss.ItemsCount
      this.activeItemState$ = this.route.queryParamMap.pipe(
        take(1),
        map(params => params.has(this.appConfig.itemStateQueryParamKey) ? params.get(this.appConfig.itemStateQueryParamKey) as ItemState: ItemState.ALL )
      )
      this.displayedColumns$ = iss.itemsColumns
  }
  
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
  openItemSellDialog(item):void {
    this.dhs.openSellDialog(item)
  }
  openItemDeleteDialog(item):void {
    this.dhs.openResourceDeleteDialog(`item/${item.id}/`,item.reference)
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.itemsDataSource.data.length;
    return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.itemsDataSource.data.forEach(row => this.selection.select(row));
  }
  rowSelectionChange(event,row):void {
    if (event) {
      this.selection.toggle(row) 
    }
    this.iss.setSelectedItems(this.selection.selected)
  }
  masterSelectionChange(event) {
    if (event) {
      this.masterToggle() 
    }
    this.iss.setSelectedItems(this.selection.selected)

  }
  updateSelection(event :MatSelectionListChange) {
    this.iss.setSelectedItems(event.option.selectionList.selectedOptions.selected.map((item:MatListOption) =>(item.value as Item )))
  }
  updatePage(event:PageEvent) {
    //this.paginator.pageIndex = event.pageIndex === 0 ? 1 : event.pageIndex
    const navExtra : NavigationExtras = {
      queryParams : {
        page_size : event.pageSize,
        page : event.pageIndex +1
      },
      queryParamsHandling:'merge'
    }
    this.router.navigate(['item-store'],navExtra)
  }
  openDeposerSettleDialog(item:Item) {
    this.dhs.openDeposerSettleDialog(
      `${item.deposer.first_name} ${item.deposer.last_name}`,
      item.initial_sale_price * (1 - item.intial_gain_ratio),
      [item.id]
    )
  }
  openItemReturnDialog(item:Item) {
    this.dhs.openItemReturnDialog(item)
  }
  updateSort(event: Sort): void {
    const direction = event.direction === 'asc' ? '' : '-'
    const value = event.direction ? `${direction}${event.active}` : ''
    const navExtra: NavigationExtras = {
      queryParams : {
        'ordering':value,
        page : 1
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate(['/item-store'], navExtra);
  }
}
