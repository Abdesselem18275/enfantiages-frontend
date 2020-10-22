import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item-models';
import { ItemStoreStateService } from 'src/app/item-store/service/item-store-state.service';

@Component({
  selector: 'app-items-tickets',
  templateUrl: './items-tickets.component.html',
  styleUrls: ['./items-tickets.component.scss']
})
export class ItemsTicketsComponent implements OnInit {
  itemTickets$  :Observable<Item[]>
  constructor(private iss :ItemStoreStateService) { 
    this.itemTickets$ = this.iss.selectedItems
  }

  ngOnInit(): void {
  }
  print():void {
    window.print()
  }

}
