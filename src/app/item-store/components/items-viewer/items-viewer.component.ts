import { ViewChild } from '@angular/core';
import { AfterViewInit, Component, ContentChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { sideTranslateAnimation } from '../../../animations';
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
  @ViewChild('drawer') drawer : MatDrawer
  constructor(private router : Router,private route : ActivatedRoute) { }
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
