import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomerAsyncValidator } from 'src/app/shared/directive/valid-customer.directive';

@Injectable({
  providedIn: 'root'
})
export class ItemFormFactoryService {

  constructor(private customerAsyncValidator: CustomerAsyncValidator,private fb : FormBuilder) { }

  getSellForm(price :number  = null,min_price:number = 0) : FormGroup {
    return this.fb.group({
      buyer : ['',Validators.required,[this.customerAsyncValidator.validate.bind(this.customerAsyncValidator)]],
      actual_sale_price: [price, [Validators.required,Validators.min(min_price)]],
    })
  }
  getDepositForm():FormGroup {
    return this.fb.group({
      deposer : ['',Validators.required,[this.customerAsyncValidator.validate.bind(this.customerAsyncValidator)]],
      depositGroup: this.fb.array([this.getDepositGroupForm()]),
    })
  }
  getDepositGroupForm():FormGroup {
    return this.fb.group({
      intial_gain_ratio:[25,[Validators.required,Validators.min(0),Validators.max(100)]],
      initial_sale_price:['',[Validators.required,Validators.min(0)]],
      label:['',[Validators.required]],
      brand:['',[Validators.required]],
      size:['',[Validators.required]]
  })

  }
  getDateRangeFilter():FormGroup {
    return this.fb.group({
      deposed_before : ['',Validators.required],
      deposed_after: ['',Validators.required]},{validators:this._dateRangeOrderValidator})
  }

  private _dateRangeOrderValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const beforeDate = control.get('deposed_before');
    const afterDate = control.get('deposed_after');

    return beforeDate && afterDate && Date.parse(afterDate.value) > Date.parse(beforeDate.value) ? { dateRangeOrderValidator: true } : null;
  }
}
