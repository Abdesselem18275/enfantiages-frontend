import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, tap,map, switchMap, throttleTime, first, startWith, take } from 'rxjs/operators';
import { Brand, Item, Size } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { InitDataService } from 'src/app/shared/service/init-data.service';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.scss']
})
export class DepositFormComponent  {
  depositForm : FormGroup
  sizes : Size[]
  brands : Brand[]
  constructor(private ids : InitDataService, private router :Router,private ads : AppDataService, private _snackBar: MatSnackBar,private iffs : ItemFormFactoryService) {
    this.depositForm = this.iffs.getDepositForm()
    this.ids.sizes.pipe(take(1)).subscribe(sizes => this.sizes = sizes)
    this.ids.brands.pipe(take(1)).subscribe(brands => this.brands = brands)
   }

  getSizeFiltredList(index:number):Size[] {
    const value =  this.getSizeControl(index).value
    return value.trim() !== "" ? 
    this.sizes.filter(size => size.label.toLowerCase().includes(value)): this.sizes
  }
  getBrandFiltredList(index:number):Size[] {
    const value =  this.getBrandControl(index).value
    return value.trim() !== "" ? 
    this.brands.filter(brand => brand.label.toLowerCase().includes(value)): this.brands
  }
  getBrandControl(index : number):AbstractControl {
    return this.depositArray.at(index).get('brand')
  }
  getSizeControl(index : number):AbstractControl {
    return this.depositArray.at(index).get('size')
  }
  get depositFormGroups() : FormGroup[] {
    return (this.depositArray.controls as FormGroup[])
  }
  get depositArray(): FormArray {
    return (this.depositForm.get('depositGroup') as FormArray)
  }
  pushDepositForm():void {
    this.depositArray.push(this.iffs.getDepositGroupForm())
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
      deposer:this.depositForm.get('deposer').value.id})))
      console.warn(formArrayValues)
    this.ads.post<Item[]>('items/',formArrayValues).pipe(throttleTime(300)).subscribe(
      (items: Item[]) => {
        this.router.navigate(['/item-store/items-viewer'])
        this._snackBar.open(`${items.length} item deposed by ${items[0].deposer.first_name} added`,'', {
        duration: 2000,
      })}
    )
  }
}
