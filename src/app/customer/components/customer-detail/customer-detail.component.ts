import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/profile-models';
import { DialogHandlerService } from 'src/app/shared/service/dialog-handler.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent  {
  customer$ : Observable<Customer>
  constructor(private dhs: DialogHandlerService,route : ActivatedRoute) {
    this.customer$ = route.data.pipe(map((x:Data) =>x.customerDetail))
   }

   openSellDialog(customer: Customer) {
     //this.dhs.openSellDialog(customer)
  }
  openCustomerDeleteDialog(customer):void {
    //this.dhs.openItemDeleteDialog(customer)
  }


}
