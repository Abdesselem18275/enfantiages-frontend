import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SellFormDialogComponent } from 'src/app/item-store/components/sell-form-dialog/sell-form-dialog.component';
import { NewCustomerFormComponent } from '../new-customer-form/new-customer-form.component';

@Component({
  selector: 'app-customer-form-dialog',
  templateUrl: './customer-form-dialog.component.html',
  styleUrls: ['./customer-form-dialog.component.scss']
})
export class CustomerFormDialogComponent {
  @ViewChild(NewCustomerFormComponent) 
  set customerForm(formComp: NewCustomerFormComponent) {
    setTimeout(() => {
      this._customerForm =formComp.customerForm;
    }, 0);
  }
  _customerForm : FormGroup
  @ViewChild(NewCustomerFormComponent) customerFormComp : NewCustomerFormComponent

  constructor(public dialogRef: MatDialogRef<CustomerFormDialogComponent>) { }
  ngOnInit(): void {
  }
  onClose(): void {
    this.dialogRef.close();
    }
  onSubmit():void {
    this._customerForm.markAllAsTouched()
    this.customerFormComp.updateCustomerForm(this._customerForm)
    if(this._customerForm.valid) {
      this.dialogRef.close(this._customerForm.value);
    }
  }
}
