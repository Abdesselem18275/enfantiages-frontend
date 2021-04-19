import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { SellFormDialogComponent } from '../../item-store/components/sell-form-dialog/sell-form-dialog.component';
import {sellFormValuereplacer} from '../../core/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemStoreStateService } from 'src/app/item-store/service/item-store-state.service';
import { RessourceDeleteDialogComponent } from '../components/ressource-delete-dialog/ressource-delete-dialog.component';
import { Customer } from 'src/app/core/models/profile-models';
import { DeposerSettelConfirmationComponent } from '../components/deposer-settel-confirmation/deposer-settel-confirmation.component';
import { forkJoin } from 'rxjs';
import { ItemReturnDialogComponent } from 'src/app/item-store/components/item-return-dialog/item-return-dialog.component';
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
  openDeposerSettleDialog(deposer : string,amount:number,deposedItemsIds: number[]) {
    const dialogRef = this.dialog.open(DeposerSettelConfirmationComponent, {
      width: '320px',
      data: {deposer,amount}
    });
    dialogRef.beforeClosed().pipe(
      take(1),
      filter(result => result ? true : false),
      map(() => deposedItemsIds.map(id => this.ads.patch<Item>(
        'item/'+id.toString()+'/',
        JSON.stringify({deposer_paid:true})
           ))),
      switchMap((reqs) => forkJoin(reqs))
      ).subscribe((x : Item[]) => {
        const messageSubject = x.length > 1 ?  `${x.length} items` : `Item ${x[0].reference}`
        //this.router.navigate(['/item-store/items-viewer', { outlets: { itemContentOutlet: null } }])
        this._snackBar.open(`${messageSubject} succesfully setteled `,'', {
        duration: 2000,
      })}
      )
  }
  openItemReturnDialog(item: Item) {
    const dialogRef = this.dialog.open(ItemReturnDialogComponent, {
      width: '320px',
      data: {item}
    });

    dialogRef.beforeClosed().pipe(
      take(1),
      filter(result => result ? true : false),
      switchMap(result => 
        this.ads.patch<Item>('item/'+item.id.toString()+'/',JSON.stringify(result)).pipe(
          first()))).subscribe(
            (item:Item) => this._snackBar.open(`Item succesfully returned`,'', {
        duration: 2000,
      }))
  }

}
