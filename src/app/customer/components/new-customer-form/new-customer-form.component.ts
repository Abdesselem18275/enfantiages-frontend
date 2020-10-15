import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-customer-form',
  templateUrl: './new-customer-form.component.html',
  styleUrls: ['./new-customer-form.component.scss']
})
export class NewCustomerFormComponent implements OnInit {
  customerForm : FormGroup
  constructor(private fb : FormBuilder) {
    this.customerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      civility:['Mr',Validators.required],
      password:['default_pass',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  updateCustomerForm(formGroup :FormGroup):void {
    this.customerForm = formGroup
  }

}
