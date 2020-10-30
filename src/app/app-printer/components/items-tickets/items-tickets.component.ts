import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { ItemStoreStateService } from 'src/app/item-store/service/item-store-state.service';
import { AppDataService } from 'src/app/shared/service/app-data.service';
const ITEMS_PER_PAGE = 27

@Component({
  selector: 'app-items-tickets',
  templateUrl: './items-tickets.component.html',
  styleUrls: ['./items-tickets.component.scss']
})
export class ItemsTicketsComponent implements OnInit {
  itemTickets$  :Observable<Map<number,Item[]>>
  itemsCount$ : Observable<number>
  constructor(private ads : AppDataService,private iss :ItemStoreStateService) { 
    this.itemsCount$  = this.iss.ItemsCount
    this.itemTickets$ = this.iss.selectedItems.pipe(
      map((items:Item[] )=> (items.reduce(
        (acc: Map<number,Item[]>, currentValue: Item, currentIndex: number) => 
      { 
        const pageNumber = Math.floor(currentIndex/ITEMS_PER_PAGE) +1
        return currentIndex % ITEMS_PER_PAGE === 0 ? 
        acc.set(pageNumber,[currentValue]):
        acc.set(pageNumber,acc.get(pageNumber).concat([currentValue]))
      },new Map<number,Item[]>())) )
    )
  }
  ngOnInit(): void {
  }
  print():void {
    window.print()
  }

}
