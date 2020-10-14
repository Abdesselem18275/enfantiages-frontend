import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemFormFactoryService {

  constructor(private fb : FormBuilder) { }

  getSellForm(min_price:number = 0) : FormGroup {
    return this.fb.group({
      buyer : ['',Validators.required],
      sale_price: ['', [Validators.required,Validators.min(min_price)]],
    })
  }
  getDepositForm():FormGroup {
    return this.fb.group({
      deposer : ['',Validators.required],
      depositGroup: this.fb.array([this.getDepositGroupForm()]),
    })
  }
  getDepositGroupForm():FormGroup {
    return this.fb.group({
      gain_ratio:[20,[Validators.required,Validators.min(0),Validators.max(100)]],
      price:['',[Validators.required,Validators.min(0)]],
      label:['',[Validators.required]]
  })
     
  }
}
