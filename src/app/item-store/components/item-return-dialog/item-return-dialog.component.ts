import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Item, ReturnCause } from 'src/app/core/models/item-models';
import { ItemFormFactoryService } from 'src/app/item-store/service/item-form-factory-service/item-form-factory.service';
import { InitDataService } from 'src/app/shared/service/init-data.service';

@Component({
  selector: 'app-item-return-dialog',
  templateUrl: './item-return-dialog.component.html',
  styleUrls: ['./item-return-dialog.component.scss']
})
export class ItemReturnDialogComponent {
  returnForm: FormGroup;
  returnCauses : ReturnCause[]
  constructor(
    private ids : InitDataService,
    private iffs : ItemFormFactoryService,
    public dialogRef: MatDialogRef<ItemReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item : Item}) {
      this.returnForm = this.iffs.getReturnForm()
      this.ids.returnCauses.pipe(first()).subscribe(returnCauses => this.returnCauses = returnCauses)
    }

  getReturnCauseFiltredList():ReturnCause[] {
      const value = this.getReturnCauseControl().value && (this.getReturnCauseControl().value as string).toLowerCase()
      return value && value.trim() !== "" ? 
      this.returnCauses && this.returnCauses.filter(ret => ret.label.toLowerCase().includes(value)): this.returnCauses
    }
    getReturnCauseControl():AbstractControl {
      return this.returnForm.get('return_cause')
    }
  onClose(): void {
    this.dialogRef.close();
    }
  onSubmit():void {
    this.returnForm.markAllAsTouched()
    this.returnForm.enable()
    if(this.returnForm.valid) {
      const value =this.returnForm.value
      if(value['return_cause'] === '') {
        delete value['return_cause']
      }
      this.dialogRef.close(value);
    }
  }
}
