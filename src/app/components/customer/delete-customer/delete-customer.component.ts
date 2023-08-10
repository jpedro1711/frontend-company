import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../Customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css'],
})
export class DeleteCustomerComponent implements OnInit {
  customerId: number | null = null;
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomerId();
  }

  public getCustomerId() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.customerService
      .findCustomerById(id)
      .subscribe((customer) => (this.customer = customer));
  }

  public deleteCustomer() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.deleteCustomerById(id).subscribe((response) => {
      this.router.navigate(['/customers']);
      this.customerService.showMessage('Customer deleted successfully!');
    });
  }
}
