import { AfterViewInit, Component, ContentChild, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppDataService} from '../../../shared/service/app-data.service';
import {Item} from '../../../core/models/item-models';
import {DialogHandlerService} from '../../../shared/service/dialog-handler.service'
import {ItemStoreStateService} from '../../service/item-store-state.service'

import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnDestroy  {
  items$ : Observable<Item[]>
  selection:SelectionModel<Item>
  itemsCounts$: Observable<number>
  @Output() selectedItems = new EventEmitter<Item[]>();
  displayedColumns = ['select','reference','category','gender','brand','size','initial_sale_price','deposition_date','deposer','buyer','action']
  itemsDataSource = new MatTableDataSource<Item>();
  private subscribtion : Subscription
  constructor(
    private router : Router,
    private route : ActivatedRoute,  
    private dhs: DialogHandlerService,
    private iss: ItemStoreStateService,
    private ads : AppDataService) {
    this.items$ = iss.items
      const initialSelection = [];
      const allowMultiSelect = true;
      this.subscribtion = this.items$.subscribe(items => {this.itemsDataSource.data = items})
      this.selection = new SelectionModel<Item>(allowMultiSelect, initialSelection);
      this.itemsCounts$ = this.iss.ItemsCount
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
}
