import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemStoreStateService } from 'src/app/item-store/service/item-store-state.service';

@Injectable({
  providedIn: 'root'
})
export class CanPrintTicketsGuard implements CanActivate {
  constructor(private router : Router,private snakBar : MatSnackBar, private iss :ItemStoreStateService){}
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.iss.selectedItems.pipe(
        map((items) => {
          if(items.length > 0) {
            return true
          } else {
            this.snakBar.open('Select at least one item','',{duration : 2500})
            return false
          }}))
  }
  
}
