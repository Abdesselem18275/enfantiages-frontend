import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';

@Component({
  selector: 'app-items-tickets',
  templateUrl: './items-tickets.component.html',
  styleUrls: ['./items-tickets.component.scss']
})
export class ItemsTicketsComponent implements OnInit {
  itemTickets$  :Observable<Item[]>
  constructor(route: ActivatedRoute, private ads  :AppDataService) { 
    this.itemTickets$ = this.ads.get<Item[]>('items/')
  }

  ngOnInit(): void {
  }
  print():void {
    window.print()
  }

}
