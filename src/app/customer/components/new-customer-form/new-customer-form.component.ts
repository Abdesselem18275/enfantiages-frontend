import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { InitDataService } from 'src/app/shared/service/init-data.service';
import { CustomerStoreStateService } from '../../service/customer-store-state.service';


@Component({
  selector: 'app-new-customer-form',
  templateUrl: './new-customer-form.component.html',
  styleUrls: ['./new-customer-form.component.scss']
})
export class NewCustomerFormComponent implements OnInit {
  customerForm : FormGroup
  customer : Customer

  constructor(
    route : ActivatedRoute,
    private ids :InitDataService  ,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private css  :CustomerStoreStateService,
    private ads :AppDataService, 
    private fb : FormBuilder) {
    this.customerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      civility:['Mr',Validators.required],
      adress: ['',Validators.required],
      phone_number : [null,Validators.required],
      id_reference: [''],
      birth_date: [null],
      //password:['default_pass',Validators.required]
    })
    route.data.pipe(
      take(1),
      tap(x => console.warn(x)),
      filter((x:Data) => x.hasOwnProperty('customerDetail')),
      map((x:Data) =>x.customerDetail)).subscribe((x) => {
        this.customer = x
        this.customerForm.removeControl('password')
        this.customerForm.patchValue({
          ...x,

        })
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
      if(this.customer) {
        this.ads.put<Customer>(`profile/${this.customer.id}/`,JSON.stringify(this.customerForm.value)).
        pipe(take(1)).subscribe((customer:Customer)=> {
          this.ids.addCustomer(customer)
          this.css.addCustomer(customer)

          this.router.navigate(['customer'])
          this._snackBar.open(`Customer ${customer.first_name} ${customer.last_name} successfully updated `,'', {
          duration: 3000,
        })},
        (error) => {
          console.warn(Object.entries(error))
          this._snackBar.open(error.join('\n'),'', {
            duration: 3000,
          })
        })
      }
      else {
        this.ads.post<{token:string,profile:Customer}>('profiles/',JSON.stringify(this.customerForm.value)).
        pipe(take(1)).subscribe((customer:{token:string,profile:Customer})=> {
          this.ids.addCustomer(customer.profile)
          this.css.addCustomer(customer.profile)
          this.router.navigate(['customer'])
          this._snackBar.open(`Customer ${customer.profile.first_name} ${customer.profile.last_name} successfully created`,'', {
          duration: 3000,
        })},
        (error) => {
          this._snackBar.open(error.join('\n'),'', {
            duration: 3000,
          })
        })
      }

    }

  }

}
