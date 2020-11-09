import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { Brand, Category, Color, Size } from 'src/app/core/models/item-models';
import { Customer } from 'src/app/core/models/profile-models';
import { InitDataService } from 'src/app/shared/service/init-data.service';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss']
})
export class ItemsFilterComponent  {
  filterForm : FormGroup
  formSubscription : Subscription
  sizes$ : Observable<Size[]>
  customers$ : Observable<Customer[]>
  brands$ : Observable<Brand[]>
  colors$ : Observable<Color[]>
  categories$:Observable<Category[]>
  @Output() activeFilterControls  = new EventEmitter<number>()
  constructor(private iis : InitDataService, private router: Router,private iffs : ItemFormFactoryService,private route:  ActivatedRoute) {
    this.filterForm = this.iffs.getFilterForm()
    this.sizes$ =this.iis.sizes
    this.customers$ =this.iis.customers
    this.brands$ =this.iis.brands
    this.colors$ =this.iis.colors
    this.categories$ = this.iis.categories
    this.route.queryParamMap.pipe(
      take(1)).subscribe((queryParam : ParamMap) => {
        Object.keys(this.filterForm.controls).forEach(key => {
          if(this.filterForm.controls.hasOwnProperty(key)) {
            const value = queryParam.get(key)&&queryParam.get(key).includes(',') ?
            queryParam.get(key).split(','):queryParam.get(key)
            this.filterForm.controls[key].setValue(value)
          }
        })
    })
   }
  onSubmit(): void {
    this.filterForm.markAsDirty()
    this.filterForm.enable()
    if(this.filterForm.valid) {
      let x = this.filterForm.value
      Object.keys(x).forEach((key) => {
        x[key] = Array.isArray(x[key]) ? (x[key] as string[]).join(',').concat(','): x[key]
      })
      console.warn(x)
       const navExtra : NavigationExtras = {
        queryParams : {
          ...x
        },
        queryParamsHandling: 'merge'
      }
      this.router.navigate(['/item-store/items-viewer'],navExtra)
    }

  }
}
