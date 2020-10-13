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
}
