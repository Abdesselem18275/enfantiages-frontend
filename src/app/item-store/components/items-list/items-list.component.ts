import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataService} from '../../../shared/service/app-data.service';
import {Item} from '../../../core/models/item-models';
import {DialogHandlerService} from '../../../shared/service/dialog-handler.service'
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent  {
  items$ : Observable<Item[]>
  displayedColumns = ['reference','label','deposer','deposer_gain','deposition_date','action']
  constructor(private dhs: DialogHandlerService,private ads : AppDataService) {
    this.items$ = this.ads.get<Item[]>('items/')
  }
  openSellDialog(item):void {
    this.dhs.openSellDialog(item)
  }
}
