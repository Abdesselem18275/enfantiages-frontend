import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './components/customer/customer.component';
import { NewCustomerFormComponent } from './components/new-customer-form/new-customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomerFormDialogComponent } from './components/customer-form-dialog/customer-form-dialog.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersViewerComponent } from './components/customers-viewer/customers-viewer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';


@NgModule({
  declarations: [CustomerComponent, NewCustomerFormComponent, CustomerFormDialogComponent, CustomersListComponent, CustomersViewerComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
