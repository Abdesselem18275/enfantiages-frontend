import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.scss']
})
export class DepositFormComponent implements OnInit {
  depositForm : FormGroup
  constructor(private ads : AppDataService, private _snackBar: MatSnackBar,private iffs : ItemFormFactoryService) {
    this.depositForm = this.iffs.getDepositForm()
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
    const formArrayValues = JSON.stringify((this.depositForm.get('depositGroup') as FormArray).value.
    map(obj => ({...obj,
      intial_gain_ratio : parseFloat(obj["intial_gain_ratio"])/100,
      deposer:this.depositForm.get('deposer').value["id"]})))
    this.ads.post<Item[]>('items/',formArrayValues).subscribe(
      (items: Item[]) => this._snackBar.open(`${items.length} item deposed by ${items[0].deposer.first_name} added`,'', {
        duration: 2000,
      })
    )
  }
}
