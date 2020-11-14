import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ressource-delete-dialog',
  templateUrl: './ressource-delete-dialog.component.html',
  styleUrls: ['./ressource-delete-dialog.component.scss']
})
export class RessourceDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RessourceDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {label:string}) { }

  ngOnInit(): void {
  }
  onSubmit():void {
      this.dialogRef.close('_');
  }
}
