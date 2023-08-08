import { Component, OnInit } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  customers: any = {};
  isLoading: Boolean = true;

  displayedColumns: string[] = [
    'ID',
    'name',
    'address',
    'phone-number',
    'email',
    'ações',
  ];
  dataSource: Array<Customer> | undefined;

  totalElements: number | null = null;
  totalPages: number | null = null;
  currentPage: number = 0;
  pageSize: number = 5;

  pageSizeOptions: Array<{ value: string; viewValue: string }> = [
    { value: '5', viewValue: '5' },
    { value: '10', viewValue: '10' },
    { value: '15', viewValue: '15' },
  ];

  ngOnInit(): void {
    this.getCustomersWithPage();
  }

  nextPage() {
    if (this.totalPages == null) return;
    if (this.currentPage == this.totalPages - 1) {
      return;
    } else {
      this.currentPage += 1;
      this.getCustomersWithPage();
    }
  }

  previousPage() {
    if (this.currentPage == 0) {
      return;
    } else {
      this.currentPage -= 1;
      this.getCustomersWithPage();
    }
  }

  onSelectChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 0;
    this.getCustomersWithPage();
  }

  getCustomersWithPage() {
    this.customerService
      .getCustomersWithPage(this.currentPage, this.pageSize)
      .subscribe(
        (customers) => (
          (this.customers = customers),
          (this.dataSource = this.customers._embedded.customerList),
          (this.totalElements = this.customers.page.totalElements),
          (this.totalPages = this.customers.page.totalPages),
          (this.isLoading = false)
        )
      );
  }
}
