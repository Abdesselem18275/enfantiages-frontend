import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { InitDataService } from 'src/app/shared/service/init-data.service';


@Component({
  selector: 'app-new-customer-form',
  templateUrl: './new-customer-form.component.html',
  styleUrls: ['./new-customer-form.component.scss']
})
export class NewCustomerFormComponent implements OnInit {
  customerForm : FormGroup
  constructor(private ids :InitDataService  ,private router: Router,private _snackBar: MatSnackBar, private ads :AppDataService, private fb : FormBuilder) {
    this.customerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      civility:['Mr',Validators.required],
      adress: ['',Validators.required],
      phone_number : [null,Validators.required],
      id_reference: [''],
      birth_date: [''],
      password:['default_pass',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  updateCustomerForm(formGroup :FormGroup):void {
    this.customerForm = formGroup
  }
  onSubmit():void {
    this.customerForm.markAsTouched()
    this.customerForm.enable()
    if(this.customerForm.valid) {
      this.ads.post<{token:string,profile:Customer}>('profiles/',JSON.stringify(this.customerForm.value)).
      pipe(take(1)).subscribe((customer:{token:string,profile:Customer})=> {
        this.ids.addCustomer(customer.profile)
        this.router.navigate(['item-store'])
        this._snackBar.open(`Customer ${customer.profile.first_name} ${customer.profile.last_name} added`,'', {
        duration: 3000,
      })},
      (error) => {
        this._snackBar.open(Object.values(error).join('\n'),'', {
          duration: 3000,
        })
      })
    }

  }

}
