import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../../core/models/profile-models';
import {PaginatedResponseType} from '../../core/models/shared';
import { AppDataService } from '../../shared/service/app-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerStoreStateService {
  private _selectedCustomersSubject = new BehaviorSubject<Customer[]>([])
  private _customersSubject = new BehaviorSubject<Customer[]>([])
  private _customersCountSubject = new BehaviorSubject<number>(0)

  constructor(private ads : AppDataService ,private route : ActivatedRoute) {
    this.route.queryParamMap.pipe(
      debounceTime(300),
      switchMap((paramMap:ParamMap ) => this.ads.get<PaginatedResponseType<Customer>>('profiles/',paramMap)
      )).subscribe(response => {
        this.setCustomers(response.results)
        this.setCustomersCount(response.count)
      })
  
  }
  setSelectedCustomers(customers:Customer[]):void {
    this._selectedCustomersSubject.next(customers)
  }
  setCustomers(customers:Customer[]):void {
    this._customersSubject.next(customers)
  }
  setCustomersCount(count:number):void {
    this._customersCountSubject.next(count)
  }
  deleteCustomer(id:number):void {
    const customers : Customer[] = this._customersSubject.getValue().filter(customer => customer.id !== id)
    this.setCustomers(customers)
    this.setCustomersCount(this._customersCountSubject.getValue()-1)
  }
  get selectedCustomers():Observable<Customer[]> {
    return this._selectedCustomersSubject.asObservable()
  }
  get customers(): Observable<Customer[]> {
    return this._customersSubject.asObservable()
  }
  get CustomersCount():Observable<number> {
    return this._customersCountSubject.asObservable()
  }

}
