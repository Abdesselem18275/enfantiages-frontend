import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPrinterComponent } from './components/app-printer/app-printer.component';
import { ItemsTicketsComponent } from './components/items-tickets/items-tickets.component';
import { CanPrintTicketsGuard} from './guards/can-print-tickets.guard'
const routes: Routes = [{ 
  path: '', 
  component: AppPrinterComponent,
  children: [
    {
      path:'',
      redirectTo:'item-tickets'
    },
    {
      path:'item-tickets',
      component:ItemsTicketsComponent,
      canActivate :[CanPrintTicketsGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPrinterRoutingModule { }
