import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/core/models/item-models';

@Component({
  selector: 'app-sell-form-dialog',
  templateUrl: './sell-form-dialog.component.html',
  styleUrls: ['./sell-form-dialog.component.scss']
})
export class SellFormDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SellFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item : Item}) {
    }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
}
