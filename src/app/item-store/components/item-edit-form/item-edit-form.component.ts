import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map, take, throttleTime } from 'rxjs/operators';
import { Brand, Item, Size } from 'src/app/core/models/item-models';
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
    }))
    this.ids.sizes.pipe(take(1)).subscribe(sizes => this.sizes = sizes)
    this.ids.brands.pipe(take(1)).subscribe(brands => this.brands = brands)
   }

   getSizeFiltredList():Size[] {
    const value =  this.getSizeControl().value
    return value.trim() !== "" ? 
    this.sizes.filter(size => size.label.toLowerCase().includes(value)): this.sizes
  }
  getBrandFiltredList():Size[] {
    const value =  this.getBrandControl().value
    return value.trim() !== "" ? 
    this.brands.filter(brand => brand.label.toLowerCase().includes(value)): this.brands
  }
  getBrandControl():AbstractControl {
    return this.editForm.get('brand')
  }
  getSizeControl():AbstractControl {
    return this.editForm.get('size')
  }
  onSubmit() {
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
  }
}
