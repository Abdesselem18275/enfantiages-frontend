import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from './app-data.service';

@Injectable({
  providedIn: 'root'
})
export class InitDataService {
  private customersDataSubject = new BehaviorSubject<Customer[]>(null)

  constructor(private ads :AppDataService) { }

  loadInitData():Promise<void| Object> {
    return combineLatest(this.ads.get<Customer[]>('profiles/')).
           toPromise().then(([customers]) => {
          // const filterDataRefined = this.rfb.transformReportForm(filtersData[0])
            this.setCustomers(customers)
           })    
  }

  setCustomers(payload : Customer[]):void {
      this.customersDataSubject.next(payload)
  }
  get customers() :Observable<Customer[]> {
    return this.customersDataSubject.asObservable()
  }
  addCustomer(paylad:Customer):void {
    this.setCustomers(this.customersDataSubject.value.concat([paylad]))
  } 
}
