import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { SellFormDialogComponent } from '../../item-store/components/sell-form-dialog/sell-form-dialog.component';
import {sellFormValuereplacer} from '../../core/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemStoreStateService } from 'src/app/item-store/service/item-store-state.service';
import { RessourceDeleteDialogComponent } from '../components/ressource-delete-dialog/ressource-delete-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogHandlerService {

  constructor(
    private iss : ItemStoreStateService,
    private _snackBar: MatSnackBar,
    private router : Router,
    private ads : AppDataService,
    private dialog: MatDialog) { }

  openSellDialog(item: Item) {
    const dialogRef = this.dialog.open(SellFormDialogComponent, {
      width: '320px',
      data: {item}
    });

    dialogRef.beforeClosed().pipe(
      take(1),
      filter(result => result ? true : false),
      map(result => JSON.stringify({
        ...result,
        buyer: result["buyer"] ? result["buyer"].id : null,
        sale_date : new Date().toISOString()
      },sellFormValuereplacer)),
      switchMap(result => this.ads.patch<Item>('item/'+item.id.toString()+'/',result).pipe(take(1)))
      ).subscribe((item:Item) => this._snackBar.open(`Item succesfully sold to ${item.buyer.first_name}`,'', {
        duration: 2000,
      }))
  }

  openResourceDeleteDialog(uri:string,label:string) {
    const dialogRef = this.dialog.open(RessourceDeleteDialogComponent, {
      width: '320px',
      data: {label}
    });

    dialogRef.beforeClosed().pipe(
      take(1),
      filter(result => result ? true : false),
      switchMap(() => this.ads.delete(uri).pipe(take(1)))
      ).subscribe(() => {
        //this.router.navigate(['/item-store/items-viewer', { outlets: { itemContentOutlet: null } }])
        this._snackBar.open(`Object succesfully deleted `,'', {
        duration: 2000,
      })}
      )
  }

}
