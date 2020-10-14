import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss']
})
export class ItemsFilterComponent implements OnDestroy {
  filterForm : FormGroup
  formSubscription : Subscription
  constructor(private router: Router,private fb: FormBuilder,private route:  ActivatedRoute) {
    this.filterForm = this.fb.group({
      created_before:[''],
      created_after:['']

    })

    this.route.queryParamMap.pipe(
      take(1)).subscribe((queryParam : ParamMap) => {
        Object.keys(this.filterForm.controls).forEach(key => {
          if(this.filterForm.controls.hasOwnProperty(key)) {
            this.filterForm.controls[key].setValue(queryParam.get(key))
          }
        })
    })

    this.formSubscription = this.filterForm.valueChanges.pipe(debounceTime(300))
    .subscribe((x:any) => {
      /* parse dates */
      x['created_before'] = x['created_before'] ? x['created_before'].format('YYYY-MM-DD') : x['created_before'];
      x['created_after'] = x['created_after'] ? x['created_after'].format('YYYY-MM-DD') : x['created_after'];

      x = {...Object.keys(x).reduce((acc,actual) => ({
        ...acc,
        [actual] : Array.isArray(x[actual]) ? x[actual].join(',') : x[actual]
      }),{})}

       const navExtra : NavigationExtras = {
        queryParams : {
          ...x
        },
        queryParamsHandling: 'merge'
      }
      this.router.navigate(['/item-store/items-viewer'],navExtra)
    })    
   }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe()
  }
}
