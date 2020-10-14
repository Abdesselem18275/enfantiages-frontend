import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../materials';
import { RouterModule } from '@angular/router';
import { CustomersAutoCompleteFieldComponent } from './customers-auto-complete-field/customers-auto-complete-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';


@NgModule({
  declarations: [NavBarComponent, CustomersAutoCompleteFieldComponent, SearchBoxComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule ,
    RouterModule,
    MaterialModule,
    CommonModule
  ],
  exports: [
    NavBarComponent,
    CustomersAutoCompleteFieldComponent,
    SearchBoxComponent,
    MaterialModule
  ]
})
export class SharedModule { }
