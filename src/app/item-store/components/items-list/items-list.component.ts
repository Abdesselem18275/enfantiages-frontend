import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataService} from '../../../shared/service/app-data.service';
import {Item} from '../../../core/models/item-models';
import {DialogHandlerService} from '../../../shared/service/dialog-handler.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent  {
  items$ : Observable<Item[]>
  displayedColumns = ['reference','label','deposer','initial_sale_price','deposer_gain','deposition_date','action']
  constructor(private route : ActivatedRoute,  private dhs: DialogHandlerService,private ads : AppDataService) {
    this.items$ = this.route.queryParamMap.pipe(
      debounceTime(200),
      switchMap((paramMap:ParamMap ) => this.ads.get<Item[]>('items/',paramMap)))
  }
  openSellDialog(item):void {
    this.dhs.openSellDialog(item)
  }
}
