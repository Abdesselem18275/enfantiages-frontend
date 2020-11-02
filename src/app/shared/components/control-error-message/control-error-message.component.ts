import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-control-error-message',
  templateUrl: './control-error-message.component.html',
  styleUrls: ['./control-error-message.component.scss']
})
export class ControlErrorMessageComponent implements OnChanges {
  @Input() error : ValidationErrors;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getErrorMessage(error:string,value:any) {
    switch(error) {
      case 'required': {
          return 'This field is required';
      }
      case 'email': {
       return 'Enter a valid email adress';
   }
   case 'passwordNotConfirmed': {
     return 'Password must be equals';
  }
  case 'validCustomer': {
    return 'This customer does not exist';
  }
  case 'min': {
    return `Minimum value is ${value['min']}`
  }
    }
    return '';
  }
  get errorsArray() {
    return Object.keys(this.error).map(key => this.getErrorMessage(key,this.error[key]))
  }
}
