import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { Brand, Size } from 'src/app/core/models/item-models';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from './app-data.service';
type initDataType = {customers : Customer[],brands:Brand[],sizes:Size[]}
@Injectable({
  providedIn: 'root'
})
export class InitDataService {
  private customersDataSubject = new BehaviorSubject<Customer[]>(null)
  private brandsDataSubject = new BehaviorSubject<Brand[]>(null)
  private sizesDataSubject = new BehaviorSubject<Size[]>(null)

  constructor(private ads :AppDataService) { }

  loadInitData():Promise<void| Object> {
    return this.ads.get<initDataType>('initData/').
           toPromise().then((data :initDataType ) => {
            this.setCustomers(data.customers);
            this.setBrands(data.brands)
            this.setSizes(data.sizes);
           })    
  }

  setCustomers(payload : Customer[]):void {
      this.customersDataSubject.next(payload)
  }
  setSizes(payload : Size[]):void {
    this.sizesDataSubject.next(payload)
}
setBrands(payload : Brand[]):void {
  this.brandsDataSubject.next(payload)
}
  get customers() :Observable<Customer[]> {
    return this.customersDataSubject.asObservable()
  }
  get sizes() :Observable<Size[]> {
    return this.sizesDataSubject.asObservable()
  }
  get brands() :Observable<Brand[]> {
    return this.brandsDataSubject.asObservable()
  }
  addCustomer(paylad:Customer):void {
    this.setCustomers(this.customersDataSubject.value.concat([paylad]))
  } 
}
