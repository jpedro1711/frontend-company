import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../Customer';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  customerId: number | null = null;
  customer: Customer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCustomerById();
  }

  form = this.formBuilder.group({
    id: [''],
    name: [
      this.customer?.name,
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    address: [
      this.customer?.address,
      [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
    ],
    phoneNumber: [
      this.customer?.phoneNumber,
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    email: [
      this.customer?.email,
      [Validators.required, Validators.email, Validators.maxLength(255)],
    ],
  });

  public getCustomerById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.customerService.findCustomerById(id).subscribe(
      (customer) => (
        (this.customer = customer),
        this.form.patchValue({
          name: customer.name,
          address: customer.address,
          phoneNumber: customer.phoneNumber,
          email: customer.email,
        })
      )
    );
  }

  updateCustomer() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customer) {
      const data: Partial<Customer> = {
        name: this.form.get('name')?.value,
        address: this.form.get('address')?.value,
        phoneNumber: this.form.get('phoneNumber')?.value,
        email: this.form.get('email')?.value,
      };
      console.log(data);
      this.customerService.updateCustomer(data, id).subscribe((response) => {
        this.router.navigate(['/customers']);
        this.customerService.showMessage('Customer updated successfully!');
      });
    }
  }

  handleSubmit() {
    if (this.form.valid) {
      this.updateCustomer();
    } else {
      this.customerService.showErrorMessage('Existem campos inválidos!');
    }
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('email')) {
      return 'E-mail inválido';
    }
    if (field?.hasError('minlength')) {
      const len = field.errors
        ? field.errors['minlength']['requiredLength']
        : 2;
      return `Tamanho mínimo de ${len} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const len = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 255;
      return `Tamanho máximo de ${len} caracteres`;
    }
    return 'Campo inválido';
  }
}
