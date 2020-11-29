import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { DialogHandlerService } from '../../../shared/service/dialog-handler.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent  {
  item$ : Observable<Item>
  constructor(private dhs: DialogHandlerService,route : ActivatedRoute) {
    this.item$ = route.data.pipe(map((x:Data) =>x.itemDetail))
   }

   openSellDialog(item: Item) {
     this.dhs.openSellDialog(item)
  }
  openItemDeleteDialog(item: Item):void {
    this.dhs.openResourceDeleteDialog(`item/${item.id}/`,item.reference)
  }
  openDeposerSettleDialog(item:Item) {
    this.dhs.openDeposerSettleDialog(
      `${item.deposer.first_name} ${item.deposer.last_name}`,
      item.initial_sale_price * (1 - item.intial_gain_ratio),
      [item.id]
    )
  }
}
