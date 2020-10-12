import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemStoreComponent } from './components/item-store/item-store.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemsViewerComponent } from './components/items-viewer/items-viewer.component';
import { ItemDetailResolverService } from './resolver/item-detail-resolver.service';

const routes: Routes = [{
  path: '',
  component: ItemStoreComponent,
  children: [
    {
      path:'',
      pathMatch:'full',
      redirectTo:'items-viewer'
    },
    {
      path:'items-viewer',
      component: ItemsViewerComponent,
      children: [
        {
          path:'',
          component:ItemsListComponent,
          outlet: 'itemContentOutlet',
        },
        {
          path:'item-detail/:id',
          component:ItemDetailComponent,
          outlet: 'itemContentOutlet',
          resolve: {itemDetail : ItemDetailResolverService}
        }

      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemStoreRoutingModule { }
