import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../materials';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class SharedModule { }
