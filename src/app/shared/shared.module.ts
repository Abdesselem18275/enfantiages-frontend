import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../materials';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {NotFountComponent} from './components/not-found/not-fount.component';
import { ValidCustomerDirective } from './directive/valid-customer.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [NavBarComponent, CustomersAutoCompleteFieldComponent, SearchBoxComponent, SideNavComponent, NotFountComponent, ValidCustomerDirective],
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
    SideNavComponent,
    NotFountComponent,
    MaterialModule
  ]
})
export class SharedModule { }
