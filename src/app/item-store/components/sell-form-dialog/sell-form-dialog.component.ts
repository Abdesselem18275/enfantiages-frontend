import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/core/models/item-models';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-sell-form-dialog',
  templateUrl: './sell-form-dialog.component.html',
  styleUrls: ['./sell-form-dialog.component.scss']
})
export class SellFormDialogComponent  {
  sellForm: FormGroup;
  constructor(
    private iffs : ItemFormFactoryService,
    public dialogRef: MatDialogRef<SellFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item : Item}) {
      this.sellForm = this.iffs.getSellForm(data.item.initial_sale_price,data.item.deposer_gain)
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
}
