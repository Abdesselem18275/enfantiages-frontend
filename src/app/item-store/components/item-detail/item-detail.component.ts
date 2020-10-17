import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { DialogHandlerService } from '../../../shared/service/dialog-handler.service';
const ITEM_DETAIL_META :{icon:string,title:string,elements: {key:string,label:string}[]}[] = [
  {icon:'qr_code',title:'IDENTIFICATION',
  elements:[
    {key:'reference',label:'Reference'},{key:'label',label:'Label'},{key:'status',label:'Status'}]}
]
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent  {
  item_detail_meta = ITEM_DETAIL_META
  item$ : Observable<Item>
  constructor(private dhs: DialogHandlerService,route : ActivatedRoute) {
    this.item$ = route.data.pipe(map((x:Data) =>x.itemDetail))
   }

   openSellDialog(item: Item) {
     this.dhs.openSellDialog(item)
  }

  getValue() {
    
  }
}
