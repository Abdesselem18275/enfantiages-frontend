import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map, take, throttleTime } from 'rxjs/operators';
import { Brand, Category, Item, Size } from 'src/app/core/models/item-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { InitDataService } from 'src/app/shared/service/init-data.service';
import { ItemFormFactoryService } from '../../service/item-form-factory-service/item-form-factory.service';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.scss']
})
export class ItemEditFormComponent  {
  item : Item;
  editForm:FormGroup
  sizes : Size[]
  brands : Brand[]
  categories: Category[]
  constructor(
    private ads : AppDataService,
    private ids : InitDataService,
    private route : ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router:Router,
    private ffs : ItemFormFactoryService) {
    route.data.pipe(take(1),map((x:Data) =>x.itemDetail)).subscribe((item => {
      this.editForm = this.ffs.getItemEditForm(item);
      this.item = item;
      console.warn(this.editForm);
    }))
    this.ids.sizes.pipe(take(1)).subscribe(sizes => this.sizes = sizes)
    this.ids.brands.pipe(take(1)).subscribe(brands => this.brands = brands)
    this.ids.categories.pipe(take(1)).subscribe(categories => this.categories = categories)

   }

   getSizeFiltredList():Size[] {
    const value = this.getSizeControl().value && (this.getSizeControl().value as string).toLowerCase()
    return value && value.trim() !== "" ? 
    this.sizes && this.sizes.filter(size => size.label.toLowerCase().includes(value)): this.sizes
  }
  getBrandFiltredList():Brand[] {
    const value =  this.getBrandControl().value && (this.getBrandControl().value as string).toLowerCase()
    return value && value.trim() !== "" ? 
    this.brands && this.brands.filter(brand => brand.label.toLowerCase().includes(value)): this.brands
  }
  getCategoryFiltredList():Category[] {
    const value = this.getCategoryControl().value && (this.getCategoryControl().value as string).toLowerCase()
    return value && value.trim() !== "" ? 
    this.categories && this.categories.filter(cat => cat.label.toLowerCase().includes(value)): this.categories
  }
  getBrandControl():AbstractControl {
    return this.editForm.get('brand')
  }
  getCategoryControl():AbstractControl {
    return this.editForm.get('category')
  }
  getSizeControl():AbstractControl {
    return this.editForm.get('size')
  }
  onSubmit() {
    this.editForm.markAllAsTouched()
    this.editForm.enable()
    if(this.editForm.valid) {
    const values = this.editForm.value
    const payload = JSON.stringify({...values,
      intial_gain_ratio : parseFloat(values["intial_gain_ratio"])/100,
      sale_date: this.editForm.get('sale_date').value ? this.editForm.get('sale_date').value : null,
      buyer: this.editForm.get('buyer').value ? this.editForm.get('buyer').value.id : null,
      actual_sale_price: this.editForm.get('actual_sale_price').value ? this.editForm.get('actual_sale_price').value : null,
      deposer:this.editForm.get('deposer').value.id})
    this.ads.patch<Item>('item/'+this.item.id.toString()+'/',payload).pipe(throttleTime(300)).subscribe(
      (item: Item) => {
        this.router.navigate(['/item-store/items-viewer',{ outlets: { itemContentOutlet: ['item-detail',item.id] } }])
        this._snackBar.open(`Item ${item.reference} successfully updated`,'', {
        duration: 2000,
      })}
    )
  }}
}
