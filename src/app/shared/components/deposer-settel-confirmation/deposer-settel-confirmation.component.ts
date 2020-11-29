import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deposer-settel-confirmation',
  templateUrl: './deposer-settel-confirmation.component.html',
  styleUrls: ['./deposer-settel-confirmation.component.scss']
})
export class DeposerSettelConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeposerSettelConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {deposer:string,amount:number,multi:boolean}) { }

  ngOnInit(): void {
  }
  onSubmit():void {
    this.dialogRef.close('_');
}
}
