import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '../Customer';

const ELEMENT_DATA: Customer[] = [
  {
    id: 1,
    name: 'Josivaldo',
    address: '21, Rua das Oliveiras',
    phoneNumber: '123-534-234',
    email: 'customer@gmail.com',
  },
];

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  displayedColumns: string[] = [
    'ID',
    'name',
    'address',
    'phone-number',
    'email',
    'ações',
  ];
  dataSource = ELEMENT_DATA;
}
