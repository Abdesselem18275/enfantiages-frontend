import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';
import { SellFormComponent } from '../sell-form/sell-form.component';

@Component({
  selector: 'app-sell-form-dialog',
  templateUrl: './sell-form-dialog.component.html',
  styleUrls: ['./sell-form-dialog.component.scss']
})
export class SellFormDialogComponent  {
  sellForm: FormGroup;
  filteredCutomers$ : Observable<Customer[]>
  constructor(
    private ads : AppDataService,
    private iffs : ItemFormFactoryService,
    public dialogRef: MatDialogRef<SellFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item : Item}) {
      this.sellForm = this.iffs.getSellForm(data.item.deposer_gain)
      this.filteredCutomers$ = this.sellForm.get('buyer').valueChanges.pipe(
        switchMap((value) =>this.ads.get<Customer[]>('profiles/').pipe(
          map(customers => 
            customers.filter((customer:Customer) => Object.values(customer).find(_value => 
              typeof _value === 'string' ? _value.includes(value) : false )
            ))))
      )
    }
  

  onClose(): void {
    this.dialogRef.close();
    }
  onSubmit():void {
    this.sellForm.markAllAsTouched()
    if(this.sellForm.valid) {
      this.dialogRef.close(this.sellForm.value);
    }
  }
  displayFn(customer: Customer): string {
    return customer && customer.first_name && customer.last_name ? customer.first_name + ' '+customer.last_name   : '';
  }
}
