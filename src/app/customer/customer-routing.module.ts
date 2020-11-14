import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersViewerComponent } from './components/customers-viewer/customers-viewer.component';
import {NewCustomerFormComponent} from './components/new-customer-form/new-customer-form.component';
import {CustomerDetailResolverService} from './resolvers/customer-detail-resolver.service';
const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [
    {
      path:'',
      pathMatch:'full',
      redirectTo:'customers-viewer'
    },
    {
      path:'customers-viewer',
      component: CustomersViewerComponent,
      children: [
        {
          path:'',
          component:CustomersListComponent,
          outlet: 'customerContentOutlet',
        },
        {
          path:'customer-detail/:id',
          component:CustomerDetailComponent,
          outlet: 'customerContentOutlet',
          resolve: {customerDetail : CustomerDetailResolverService}
        },
        {
          path:'new-customer',
          component:NewCustomerFormComponent,
          outlet: 'customerContentOutlet',
        },
        {
          path:'customer-edit/:id',
          component:NewCustomerFormComponent,
          outlet: 'customerContentOutlet',
          resolve: {customerDetail : CustomerDetailResolverService}
        }
      ]
    },

  ]
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
