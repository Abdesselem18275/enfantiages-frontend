import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.scss']
})
export class DepositFormComponent implements OnInit {
  depositForm : FormGroup
  constructor(private _snackBar: MatSnackBar,private iffs : ItemFormFactoryService) {
    this.depositForm = this.iffs.getDepositForm()
    console.warn((this.depositForm.get('depositGroup') as FormArray).controls)
   }

  ngOnInit(): void {
  }

  getDepositArray(): any[] {
    return (this.depositForm.get('depositGroup') as FormArray).controls
  }
  pushDepositForm():void {
    (this.depositForm.get('depositGroup') as FormArray).push(this.iffs.getDepositGroupForm())
  }
  removeDepositForm(index:number):void {
    if(this.itemsNumber() < 2) {
      this._snackBar.open('At leat one item must be deposed','', {
        duration: 2000,
      });
    } else {
      (this.depositForm.get('depositGroup') as FormArray).removeAt(index)
    }
  }
  itemsNumber():number {
    return (this.depositForm.get('depositGroup') as FormArray).length
  }
  onSubmit() {
    const formArrayValues = JSON.stringify((this.depositForm.get('depositGroup') as FormArray).value.map(
      obj => ({...obj,deposer:this.depositForm.get('deposer').value["id"]})))
    console.warn(formArrayValues)
  }
}
