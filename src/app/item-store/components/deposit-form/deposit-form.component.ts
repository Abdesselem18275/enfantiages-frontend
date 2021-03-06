import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, tap,map, switchMap, throttleTime, first, startWith, take } from 'rxjs/operators';
import { Brand, Category, Color, Item, Size } from 'src/app/core/models/item-models';
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
  categories: Category[]
  colors$:Observable<Color[]>
  constructor(private ids : InitDataService, private router :Router,private ads : AppDataService, private _snackBar: MatSnackBar,private iffs : ItemFormFactoryService) {
    this.depositForm = this.iffs.getDepositForm()
    this.ids.sizes.pipe(take(1)).subscribe(sizes => this.sizes = sizes)
    this.ids.brands.pipe(take(1)).subscribe(brands => this.brands = brands)
    this.ids.categories.pipe(take(1)).subscribe(categories => this.categories = categories)
    this.colors$ = this.ids.colors
   }

  getSizeFiltredList(index:number):Size[] {
    const value =  (this.getSizeControl(index).value as string).toLowerCase()
    return value.trim() !== "" ? 
    this.sizes && this.sizes.filter(size => size.label.toLowerCase().includes(value)): this.sizes
  }
  getBrandFiltredList(index:number):Brand[] {
    const value =  (this.getBrandControl(index).value as string).toLowerCase()
    return value.trim() !== "" ? 
    this.brands && this.brands.filter(brand => brand.label.toLowerCase().includes(value)): this.brands
  }
  getCategoryFiltredList(index:number):Category[] {
    const value =  (this.getCategoryControl(index).value as string).toLowerCase()
    return value.trim() !== "" ? 
    this.categories && this.categories.filter(cat => cat.label.toLowerCase().includes(value)): this.categories
  }
  getBrandControl(index : number):AbstractControl {
    return this.depositArray.at(index).get('brand')
  }
  getSizeControl(index : number):AbstractControl {
    return this.depositArray.at(index).get('size')
  }
  getCategoryControl(index : number):AbstractControl {
    return this.depositArray.at(index).get('category')
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
    this.depositForm.markAllAsTouched()
    this.depositForm.enable()
    if(this.depositForm.valid) {
      const formArrayValues = JSON.stringify((this.depositForm.get('depositGroup') as FormArray).value.
      map(obj => ({...obj,
        intial_gain_ratio : parseFloat(obj["intial_gain_ratio"])/100,
        deposer:this.depositForm.get('deposer').value.id})))
      this.ads.post<Item[]>('items/',formArrayValues).pipe(throttleTime(300)).subscribe(
        (items: Item[]) => {
          this.router.navigate(['/item-store/items-viewer'])
          this._snackBar.open(`${items.length} item deposed by ${items[0].deposer.first_name} added`,'', {
          duration: 2000,
        })}
      )
    }

  }
}
