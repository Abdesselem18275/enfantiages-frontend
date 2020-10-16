import { Component, OnInit } from '@angular/core';
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
export class ItemsViewerComponent implements OnInit {
  isFilterActive: boolean
  constructor(private router : Router) { }

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
