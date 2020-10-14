import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { SellFormDialogComponent } from '../components/sell-form-dialog/sell-form-dialog.component';
import {sellFormValuereplacer} from '../../core/utils';
@Injectable({
  providedIn: 'root'
})
export class DialogHandlerService {

  constructor(private ads : AppDataService,private dialog: MatDialog) { }

  openSellDialog(item: Item) {
    const dialogRef = this.dialog.open(SellFormDialogComponent, {
      width: '320px',
      data: {item}
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(result => result ? true : false),
      map(result => JSON.stringify({
        ...result,
        sale_date : new Date().toISOString()
      },sellFormValuereplacer)),
      switchMap(result => this.ads.patch<Item>('item/'+item.id.toString()+'/',result).pipe(take(1)))
      ).subscribe(item => {
        alert(JSON.stringify(item,))
      })
  }
}
