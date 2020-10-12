import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemFormFactoryService {

  constructor(private fb : FormBuilder) { }

  get sellForm() : FormGroup {
    return this.fb.group({
      buyer : ['',Validators.required],
      sale_price: ['', Validators.required],
    })
  }
}
