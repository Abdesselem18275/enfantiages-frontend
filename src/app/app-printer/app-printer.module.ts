import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPrinterRoutingModule } from './app-printer-routing.module';
import { AppPrinterComponent } from './components/app-printer/app-printer.component';
import { SharedModule } from '../shared/shared.module';
import { ItemsTicketsComponent } from './components/items-tickets/items-tickets.component';


@NgModule({
  declarations: [AppPrinterComponent, ItemsTicketsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppPrinterRoutingModule
  ]
})
export class AppPrinterModule { }
