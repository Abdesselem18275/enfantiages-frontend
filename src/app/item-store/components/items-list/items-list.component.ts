import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppDataService} from '../../../shared/service/app-data.service';
import {Item} from '../../../core/models/item-models';
import {DialogHandlerService} from '../../../shared/service/dialog-handler.service'
import {ItemStoreStateService} from '../../service/item-store-state.service'

import { ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnDestroy  {
  items$ : Observable<Item[]>
  selection:SelectionModel<Item>
  @Output() selectedItems = new EventEmitter<Item[]>();
  displayedColumns = ['select','reference','label','brand','size','initial_sale_price','shop_gain','deposer_gain','deposition_date','deposer','actual_sale_price','buyer','sale_date','action']
  itemsDataSource = new MatTableDataSource<Item>();
  private subscribtion : Subscription
  constructor(
    private route : ActivatedRoute,  
    private dhs: DialogHandlerService,
    private iss: ItemStoreStateService,
    private ads : AppDataService) {
    this.items$ = iss.items
      const initialSelection = [];
      const allowMultiSelect = true;
      this.subscribtion = this.items$.subscribe(items => {this.itemsDataSource.data = items})
      this.selection = new SelectionModel<Item>(allowMultiSelect, initialSelection);

  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
  openSellDialog(item):void {
    this.dhs.openSellDialog(item)
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
    console.warn(event)
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
}
