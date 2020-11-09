import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { Brand, Category, Color, Size } from 'src/app/core/models/item-models';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from './app-data.service';
type initDataType = {
  customers : Customer[],
  brands:Brand[],
  colors:Color[],
  sizes:Size[],
  categories:Category[]}
@Injectable({
  providedIn: 'root'
})
export class InitDataService {
  private customersDataSubject = new BehaviorSubject<Customer[]>(null)
  private brandsDataSubject = new BehaviorSubject<Brand[]>(null)
  private sizesDataSubject = new BehaviorSubject<Size[]>(null)
  private categoriesDataSubject = new BehaviorSubject<Category[]>(null)
  private colorsDataSubject = new BehaviorSubject<Color[]>(null)
  constructor(private ads :AppDataService) { }

  loadInitData():Promise<void| Object> {
    return this.ads.get<initDataType>('initData/').
           toPromise().then((data :initDataType ) => {
            this.setCustomers(data.customers);
            this.setBrands(data.brands)
            this.setSizes(data.sizes);
            this.setColors(data.colors);
            this.setCategories(data.categories);
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
setColors(payload : Color[]):void {
  this.colorsDataSubject.next(payload)
}
setCategories(payload : Category[]):void {
  this.categoriesDataSubject.next(payload)
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
  get colors() :Observable<Color[]> {
    return this.colorsDataSubject.asObservable()
  }
  get categories() :Observable<Category[]> {
    return this.categoriesDataSubject.asObservable()
  }
  addCustomer(paylad:Customer):void {
    this.setCustomers(this.customersDataSubject.value.concat([paylad]))
  } 
}
