import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { take, mergeMap, map, switchMap } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailResolverService implements Resolve<Item> {

  constructor(private ads : AppDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item | Observable<Item>  {
    const uri = ['item/', route.paramMap.get('id')].join('');
    return this.ads
    .get<Item>(uri)
    .pipe(take(1))
  }
}
