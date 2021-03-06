import { ViewChild } from '@angular/core';
import { AfterViewInit, Component, ContentChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item-models';
import { GlobalStateService } from 'src/app/shared/service/global-state.service';
import { sideTranslateAnimation } from '../../../animations';
import { ItemStoreStateService } from '../../service/item-store-state.service';
@Component({
  selector: 'app-items-viewer',
  templateUrl: './items-viewer.component.html',
  styleUrls: ['./items-viewer.component.scss'],
  animations: [
    sideTranslateAnimation
    ]
})
export class ItemsViewerComponent implements OnInit,AfterViewInit {
  isFilterActive: boolean
  IsLoading$ : Observable<boolean>
  selectedItems$: Observable<Item[]>
  selectedItemsCount$: Observable<number>;
  @ViewChild('drawer') drawer : MatDrawer
  constructor(private gss : GlobalStateService,private iss :ItemStoreStateService, private router : Router) {
   this.selectedItems$ = this.iss.selectedItems;
   this.selectedItemsCount$ = this.iss.selectedItems.pipe(map(items => items.length));
   this.IsLoading$ = this.gss.isLoading
   }
  ngAfterViewInit(): void {
    this.router.events.subscribe((val) => {
     this.drawer.close()
  });
}

  ngOnInit(): void {
  }

  toggleFilter() {
    this.isFilterActive = !this.isFilterActive
  }
  onSearch(term) {
    const navExtra : NavigationExtras = {
      queryParams : {
        search:term
      },
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/item-store/items-viewer'],navExtra)
  }
}
