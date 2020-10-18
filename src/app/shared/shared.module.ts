import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../materials';
import { RouterModule } from '@angular/router';
import { CustomersAutoCompleteFieldComponent } from './customers-auto-complete-field/customers-auto-complete-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {NotFountComponent} from './components/not-found/not-fount.component';

@NgModule({
  declarations: [NavBarComponent, CustomersAutoCompleteFieldComponent, SearchBoxComponent, SideNavComponent, NotFountComponent],
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
