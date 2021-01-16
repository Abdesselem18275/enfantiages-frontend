import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'item-store', loadChildren: () => import('./item-store/item-store.module').then(m => m.ItemStoreModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'app-printer', loadChildren: () => import('./app-printer/app-printer.module').then(m => m.AppPrinterModule)},
  // { path:'**',component:NotFountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
