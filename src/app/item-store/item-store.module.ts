import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemStoreRoutingModule } from './item-store-routing.module';
import { ItemStoreComponent } from './components/item-store/item-store.component';
import { ItemsViewerComponent } from './components/items-viewer/items-viewer.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { SharedModule } from '../shared/shared.module';
import { SellFormDialogComponent } from './components/sell-form-dialog/sell-form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepositFormComponent } from './components/deposit-form/deposit-form.component';
import { ItemsFilterComponent } from './components/items-filter/items-filter.component';
import { ItemsStateToggelerComponent } from './components/items-state-toggeler/items-state-toggeler.component';
import { ItemDeleteDialogComponent } from './components/item-delete-dialog/item-delete-dialog.component';


@NgModule({
  declarations: [ItemStoreComponent, ItemsViewerComponent, ItemsListComponent, ItemDetailComponent, SellFormDialogComponent, DepositFormComponent, ItemsFilterComponent, ItemsStateToggelerComponent, ItemDeleteDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    SharedModule,
    ItemStoreRoutingModule
  ]
})
export class ItemStoreModule { }
