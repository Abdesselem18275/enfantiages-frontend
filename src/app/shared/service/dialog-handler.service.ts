import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { SellFormDialogComponent } from '../../item-store/components/sell-form-dialog/sell-form-dialog.component';
import {sellFormValuereplacer} from '../../core/utils';
import { CustomerFormDialogComponent } from 'src/app/customer/components/customer-form-dialog/customer-form-dialog.component';
import { Customer } from 'src/app/core/models/profile-models';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class DialogHandlerService {

  constructor(private _snackBar: MatSnackBar,private ads : AppDataService,private dialog: MatDialog) { }

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
        sale_date : new Date().toISOString()
      },sellFormValuereplacer)),
      switchMap(result => this.ads.patch<Item>('item/'+item.id.toString()+'/',result).pipe(take(1)))
      ).subscribe((item:Item) => this._snackBar.open(`Item succesfully sold to ${item.buyer.first_name}`,'', {
        duration: 2000,
      }))
  }

  openNewCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().pipe(
      take(1),
      filter(result => result ? true : false),
      map(result => JSON.stringify(result)),
      switchMap(result => this.ads.post<{token:string,profile:Customer}>('profiles/',result).pipe(
        take(1),
      )))
      .subscribe((customer:{token:string,profile:Customer})=> {
        console.warn(customer)
        this._snackBar.open(`Customer ${customer.profile.first_name} ${customer.profile.last_name} added`,'', {
        duration: 2000,
      })},
      (error) => {
        dialogRef.disableClose = false
        console.warn(error)
  })
  }
}
