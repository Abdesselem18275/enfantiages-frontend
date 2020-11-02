import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Item } from 'src/app/core/models/item-models';
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
  getItemEditForm(item:Item):FormGroup {
    return this.fb.group({
      intial_gain_ratio:[item.intial_gain_ratio*100,[Validators.required,Validators.min(0),Validators.max(100)]],
      initial_sale_price:[item.initial_sale_price,[Validators.required,Validators.min(0)]],
      label:[item.label,[Validators.required]],
      brand:[item.brand,[Validators.required]],
      size:[item.size,[Validators.required]],
      category:[item.category,[Validators.required]],
      deposer:[item.deposer,[Validators.required],,[this.customerAsyncValidator.validate.bind(this.customerAsyncValidator)]],
      buyer:[item.buyer ? item.buyer : "" ,[],[this.customerAsyncValidator.validate.bind(this.customerAsyncValidator)]],
      actual_sale_price:[item.actual_sale_price ? item.actual_sale_price : ""],
      sale_date:[item.sale_date? item.sale_date.replace('Z','') : ""],
  },{validators:this._saleIntegrityValidator})
  }
  getDepositGroupForm():FormGroup {
    return this.fb.group({
      intial_gain_ratio:[25,[Validators.required,Validators.min(0),Validators.max(100)]],
      initial_sale_price:['',[Validators.required,Validators.min(0)]],
      label:['',[Validators.required]],
      brand:['',[Validators.required]],
      category:['',[Validators.required]],
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
  private _saleIntegrityValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const actual_sale_price = control.get('actual_sale_price').value;
    const sale_date = control.get('sale_date').value;
    const buyer = control.get('buyer').value;
    if(actual_sale_price && sale_date && buyer) {
      return null
    } 
    else if (!actual_sale_price && !sale_date && !buyer) {
      return null
    }
    else {
      return { saleIntegrityError: true }
    }
  }
}
