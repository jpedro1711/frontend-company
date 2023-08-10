import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../Customer';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  name: string = '';
  address: string = '';
  phoneNumber: string = '';
  email: string = '';

  saveCustomer() {
    const data: Partial<Customer> = {
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      email: this.email,
    };
    console.log(data);
    this.customerService.createCustomer(data).subscribe((response) => {
      this.router.navigate(['/customers']);
      this.customerService.showMessage('Customer created successfully!');
    });
  }
}
