import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-customers-auto-complete-field',
  templateUrl: './customers-auto-complete-field.component.html',
  styleUrls: ['./customers-auto-complete-field.component.scss']
})
export class CustomersAutoCompleteFieldComponent implements OnInit {
  @Input() relatedFormGroup : FormGroup;
  @Input() relatedControlName: string;
  filteredCutomers$ : Observable<Customer[]>
  constructor(private router : Router, private ids : InitDataService) {

  }

  ngOnInit(): void {    
    this.filteredCutomers$ = this.relatedFormGroup.get(this.relatedControlName).valueChanges.pipe(
      tap(x => console.warn(this.relatedFormGroup)),
      switchMap((value) => this.ids.customers.pipe(
        map(customers => 
          customers.filter((customer:Customer) =>filterOnObjectProperties(customer,value)
          ))))
    )
  }
  displayFn(customer: Customer): string {
    return customer && customer.first_name && customer.last_name ? customer.first_name + ' '+customer.last_name   : '';
  }
  openCustomerFormNewTab():void {
     // Converts the route into a string that can be used 
  // with the window.open() function
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/customer/new-customer'])
  );

  window.open(url, '_blank');
  }
}
