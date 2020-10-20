import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss']
})
export class ItemsFilterComponent  {
  filterForm : FormGroup
  formSubscription : Subscription
  @Output() activeFilterControls  = new EventEmitter<number>()
  constructor(private router: Router,private iffs : ItemFormFactoryService,private route:  ActivatedRoute) {
    this.filterForm = this.iffs.getDateRangeFilter()

    this.route.queryParamMap.pipe(
      take(1)).subscribe((queryParam : ParamMap) => {
        Object.keys(this.filterForm.controls).forEach(key => {
          if(this.filterForm.controls.hasOwnProperty(key)) {
            this.filterForm.controls[key].setValue(queryParam.get(key))
          }
        })
    })

   }
  onSubmit(): void {
    console.warn(this.filterForm)
    if(this.filterForm.valid) {
      console.warn(this.filterForm.value)
      let x = this.filterForm.value
      Object.keys(x).forEach(key => {
        x[key] = x[key] && typeof(x[key])!=='string' ? x[key].format('YYYY-MM-DD') : x[key];
      })

      // x = {...Object.keys(x).reduce((acc,actual) => ({
      //   ...acc,
      //   [actual] : Array.isArray(x[actual]) ? x[actual].join(',') : x[actual]
      // }),{})}

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
