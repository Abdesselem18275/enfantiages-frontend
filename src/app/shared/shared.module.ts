import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../materials';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {NotFountComponent} from './components/not-found/not-fount.component';
import { ValidCustomerDirective } from './directive/valid-customer.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CustomersAutoCompleteFieldComponent}  from './components/customers-auto-complete-field/customers-auto-complete-field.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ControlErrorMessageComponent } from './components/control-error-message/control-error-message.component';
import { ControlValidatorMessageDirective } from './directive/control-validator-message.directive';
import { FormGroupValidatorMessageDirective } from './directive/form-group-validator-message.directive';
import { RessourceDeleteDialogComponent } from './components/ressource-delete-dialog/ressource-delete-dialog.component';
@NgModule({
  declarations: [NavBarComponent, CustomersAutoCompleteFieldComponent, SearchBoxComponent, SideNavComponent, NotFountComponent, ValidCustomerDirective, ControlErrorMessageComponent, ControlValidatorMessageDirective, FormGroupValidatorMessageDirective, RessourceDeleteDialogComponent],
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
    ControlValidatorMessageDirective,
    FormGroupValidatorMessageDirective,
    MaterialModule
  ]
})
export class SharedModule { }
