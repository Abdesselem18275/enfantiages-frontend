import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { filterOnObjectProperties } from 'src/app/core/utils';
import { CustomerAsyncValidator } from '../../directive/valid-customer.directive';
import { AppDataService } from '../../service/app-data.service';
import { InitDataService } from '../../service/init-data.service';

@Component({
  selector: 'app-customers-auto-complete-field',
  templateUrl: './customers-auto-complete-field.component.html',
  styleUrls: ['./customers-auto-complete-field.component.scss']
})
export class CustomersAutoCompleteFieldComponent implements OnInit {
  @Input() relatedFormGroup : FormGroup;
  @Input() relatedControlName: string;
  filteredCutomers$ : Observable<Customer[]>
  constructor(private customerAsyncValidator: CustomerAsyncValidator,private router : Router, private ads : AppDataService) {

  }

  ngOnInit(): void {
   this.relatedFormGroup.get(this.relatedControlName).setAsyncValidators([this.customerAsyncValidator.validate.bind(this.customerAsyncValidator)])

    this.filteredCutomers$ = this.relatedFormGroup.get(this.relatedControlName).valueChanges.pipe(
      debounceTime(200),
      map(value => value.toString().toLowerCase()),
      switchMap((value) => this.ads.get<Customer[]>('profiles/',new Map().set('search',[value])))
    )
  }
  displayFn(customer: Customer): string {
    return customer && customer.first_name && customer.last_name ? customer.first_name + ' '+customer.last_name   : '';
  }
  get customer() { return this.relatedFormGroup.get(this.relatedControlName)}
  openCustomerFormNewTab():void {
     // Converts the route into a string that can be used
  // with the window.open() function
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/customer/new-customer'])
  );

  window.open(url, '_blank');
  }
}
