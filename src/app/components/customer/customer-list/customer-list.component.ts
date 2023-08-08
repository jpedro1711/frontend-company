import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '../Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';

const ELEMENT_DATA: Customer[] = [
  // {
  //   id: 1,
  //   name: 'Josivaldo',
  //   address: '21, Rua das Oliveiras',
  //   phoneNumber: '123-534-234',
  //   email: 'customer@gmail.com',
  // },
];

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

  ngOnInit(): void {
    this.customerService
      .getCustomers()
      .subscribe(
        (customers) => (
          (this.customers = customers),
          (this.dataSource = this.customers._embedded.customerList),
          (this.isLoading = false)
        )
      );
  }
}
