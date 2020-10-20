import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { isCustomerGuard } from 'src/app/core/models/profile-models';

@Injectable({
  providedIn: 'root'
})
export class CustomerAsyncValidator implements AsyncValidator {

  constructor() { }
  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    console.warn(isCustomerGuard(control.value) )
    return isCustomerGuard(control.value) ? of(null) : of({'validCustomer':true})
  }
}
/* For template driven forms */
@Directive({
  selector: '[appValidCustomer]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => CustomerAsyncValidator),
      multi: true
    }
  ]
})
export class ValidCustomerDirective {

  constructor(private validator: CustomerAsyncValidator) {

   }

   validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
