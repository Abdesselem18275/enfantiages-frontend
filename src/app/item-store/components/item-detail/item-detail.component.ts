import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { DialogHandlerService } from '../../service/dialog-handler.service';
import { SellFormDialogComponent } from '../sell-form-dialog/sell-form-dialog.component';

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
}
