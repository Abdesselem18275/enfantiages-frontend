import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from '../service/app-data.service';

@Component({
  selector: 'app-customers-auto-complete-field',
  templateUrl: './customers-auto-complete-field.component.html',
  styleUrls: ['./customers-auto-complete-field.component.scss']
})
export class CustomersAutoCompleteFieldComponent implements OnInit {
  @Input() relatedFormGroup : FormGroup;
  @Input() formControlName: string;
  filteredCutomers$ : Observable<Customer[]>
  constructor(private ads : AppDataService) { 

  }

  ngOnInit(): void {
    this.filteredCutomers$ = this.relatedFormGroup.get(this.formControlName).valueChanges.pipe(
      switchMap((value) =>this.ads.get<Customer[]>('profiles/').pipe(
        map(customers => 
          customers.filter((customer:Customer) => Object.values(customer).find(_value => 
            typeof _value === 'string' ? _value.includes(value) : false )
          ))))
    )
  }
  displayFn(customer: Customer): string {
    return customer && customer.first_name && customer.last_name ? customer.first_name + ' '+customer.last_name   : '';
  }
  getControl():FormControl {
    return (this.relatedFormGroup.get(this.formControlName) as FormControl)
  }
}
