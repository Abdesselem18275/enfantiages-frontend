import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/core/models/item-models';
import { ItemStoreStateService } from '../../service/item-store-state.service';

@Component({
  selector: 'app-item-delete-dialog',
  templateUrl: './item-delete-dialog.component.html',
  styleUrls: ['./item-delete-dialog.component.scss']
})
export class ItemDeleteDialogComponent  {

  constructor(
    private iss : ItemStoreStateService,
    public dialogRef: MatDialogRef<ItemDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item : Item}) { }

  onClose(): void {
    this.dialogRef.close();
    }
  onSubmit():void {
    this.iss.deleteItem(this.data.item.id)
      this.dialogRef.close(this.data.item.id);
  }
}
