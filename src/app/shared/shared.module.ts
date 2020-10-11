import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../materials';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class SharedModule { }
