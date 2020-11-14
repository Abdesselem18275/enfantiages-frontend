import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationExtras, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { GlobalStateService } from 'src/app/shared/service/global-state.service';
import { CustomerStoreStateService } from '../../service/customer-store-state.service';

@Component({
  selector: 'app-customers-viewer',
  templateUrl: './customers-viewer.component.html',
  styleUrls: ['./customers-viewer.component.scss']
})
export class CustomersViewerComponent implements OnInit,AfterViewInit {
  isFilterActive: boolean
  IsLoading$ : Observable<boolean>
  selectedCustomers$: Observable<Customer[]>
  selectedCustomersCount$: Observable<number>;
  @ViewChild('drawer') drawer : MatDrawer
  constructor(private gss : GlobalStateService,private iss :CustomerStoreStateService, private router : Router) {
   this.selectedCustomers$ = this.iss.selectedCustomers;
   this.selectedCustomersCount$ = this.iss.selectedCustomers.pipe(map(customers => customers.length));
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
    this.router.navigate(['/customer/customers-viewer'],navExtra)
  }
}
