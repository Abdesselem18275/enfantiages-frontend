import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {AppDataService} from '../../shared/service/app-data.service';
import  {Customer } from '../../core/models/profile-models';
@Injectable({
  providedIn: 'root'
})
export class CustomerDetailResolverService implements Resolve<Customer> {

  constructor(private ads : AppDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer | Observable<Customer>  {
    const uri = ['profile/', route.paramMap.get('id')].join('');
    return this.ads
    .get<Customer>(uri)
    .pipe(take(1))
  }
}