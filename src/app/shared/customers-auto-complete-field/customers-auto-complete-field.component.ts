import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from '../service/app-data.service';
import { DialogHandlerService } from '../service/dialog-handler.service';

@Component({
  selector: 'app-customers-auto-complete-field',
  templateUrl: './customers-auto-complete-field.component.html',
  styleUrls: ['./customers-auto-complete-field.component.scss']
})
export class CustomersAutoCompleteFieldComponent implements OnInit {
  @Input() relatedFormGroup : FormGroup;
  @Input() relatedControlName: string;
  filteredCutomers$ : Observable<Customer[]>
  constructor(private dhs : DialogHandlerService, private ads : AppDataService) {

  }

  ngOnInit(): void {
    this.filteredCutomers$ = this.ads.get<Customer[]>('profiles/')

  }
  displayFn(customer: Customer): string {
    return customer && customer.first_name && customer.last_name ? customer.first_name + ' '+customer.last_name   : '';
  }
  openCustomerDialog():void {
    this.dhs.openNewCustomerDialog()
  }
}
