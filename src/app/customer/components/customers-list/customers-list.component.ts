import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSelectionListChange, MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/core/models/profile-models';
import { AppDataService } from 'src/app/shared/service/app-data.service';
import { DialogHandlerService } from 'src/app/shared/service/dialog-handler.service';
import { CustomerStoreStateService } from '../../service/customer-store-state.service';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnDestroy  {
  customers$ : Observable<Customer[]>
  selection:SelectionModel<Customer>
  customersCounts$: Observable<number>
  @Output() selectedCustomers = new EventEmitter<Customer[]>();
  displayedColumns = ['select','name','email','phone_number','total_due_amount','action']
  customersDataSource = new MatTableDataSource<Customer>();
  private subscribtion : Subscription
  constructor(
    private router : Router,
    private route : ActivatedRoute,  
    private dhs: DialogHandlerService,
    private iss: CustomerStoreStateService,
    private ads : AppDataService) {
    this.customers$ = iss.customers
      const initialSelection = [];
      const allowMultiSelect = true;
      this.subscribtion = this.customers$.subscribe(customers => {this.customersDataSource.data = customers})
      this.selection = new SelectionModel<Customer>(allowMultiSelect, initialSelection);
      this.customersCounts$ = this.iss.CustomersCount
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
  openCustomerSellDialog(customer:Customer):void {
    //this.dhs.openSellDialog(customer)
  }
  openResourceDeleteDialog(customer:Customer):void {
    this.dhs.openResourceDeleteDialog(`/profile/${customer.id}/`,`${customer.first_name} ${customer.last_name}`)
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.customersDataSource.data.length;
    return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.customersDataSource.data.forEach(row => this.selection.select(row));
  }
  rowSelectionChange(event,row):void {
    if (event) {
      this.selection.toggle(row) 
    }
    this.iss.setSelectedCustomers(this.selection.selected)
  }
  masterSelectionChange(event) {
    if (event) {
      this.masterToggle() 
    }
    this.iss.setSelectedCustomers(this.selection.selected)

  }
  updateSelection(event :MatSelectionListChange) {
    this.iss.setSelectedCustomers(event.option.selectionList.selectedOptions.selected.map((customer:MatListOption) =>(customer.value as Customer )))
  }
  updatePage(event:PageEvent) {
    //this.paginator.pageIndex = event.pageIndex === 0 ? 1 : event.pageIndex
    const navExtra : NavigationExtras = {
      queryParams : {
        page_size : event.pageSize,
        page : event.pageIndex +1
      },
      queryParamsHandling:'merge'
    }
    this.router.navigate(['customer-store'],navExtra)
  }
}