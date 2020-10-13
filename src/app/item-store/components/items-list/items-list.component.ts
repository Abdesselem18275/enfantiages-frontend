import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataService} from '../../../shared/service/app-data.service';
import {Item} from '../../../core/models/item-models';
import { MatDialog } from '@angular/material/dialog';
import { SellFormDialogComponent } from '../sell-form-dialog/sell-form-dialog.component';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent  {
  items$ : Observable<Item[]>
  displayedColumns = ['reference','label','deposer','deposer_gain','deposition_date','action']
  constructor(public dialog: MatDialog,private ads : AppDataService) {
    this.items$ = this.ads.get<Item[]>('items/')
  }

  openSellDialog(item: Item) {
    const dialogRef = this.dialog.open(SellFormDialogComponent, {
      width: '320px',
      data: {item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        alert(JSON.stringify(result))
      }
    });
  }
  checkCol(col) {
    console.warn(col)
  }

}
