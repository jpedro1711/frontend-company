import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../Customer';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  customerId: number | null = null;
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomerById();
  }

  public getCustomerById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.customerService
      .findCustomerById(id)
      .subscribe((customer) => (this.customer = customer));
  }

  updateCustomer() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customer) {
      const data: Partial<Customer> = {
        name: this.customer.name,
        address: this.customer.address,
        phoneNumber: this.customer.phoneNumber,
        email: this.customer.email,
      };
      console.log(data);
      this.customerService.updateCustomer(data, id).subscribe((response) => {
        this.router.navigate(['/customers']);
        this.customerService.showMessage('Customer updated successfully!');
      });
    }
  }
}
