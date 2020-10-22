import { ViewChild } from '@angular/core';
import { AfterViewInit, Component, ContentChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item-models';
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
  selectedItems$: Observable<Item[]>
  @ViewChild('drawer') drawer : MatDrawer
  constructor(private iss :ItemStoreStateService, private router : Router,private route : ActivatedRoute) {
   this.selectedItems$ = this.iss.selectedItems
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
