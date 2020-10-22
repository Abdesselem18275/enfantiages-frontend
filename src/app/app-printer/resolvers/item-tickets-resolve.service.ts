import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import  { Item } from '../../core/models/item-models';
@Injectable({
  providedIn: 'root'
})
export class ItemTicketsResolveService implements Resolve<Item[]> {

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any[] | Observable<any[]> | Promise<any[]> {
    return of([])
  }
}
