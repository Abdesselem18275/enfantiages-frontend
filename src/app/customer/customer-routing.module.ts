import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import {NewCustomerFormComponent} from './components/new-customer-form/new-customer-form.component';

const routes: Routes = [{ 
  path: '', 
  component: CustomerComponent,
  children: [
    {
      path: '',
      pathMatch:'full',
      redirectTo:'new-customer'
    },
    {
      path:'new-customer',
      component:NewCustomerFormComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
