import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../Customer';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group({
    id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    address: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)],
    ],
    gender: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    country: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    creditCardType: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    childrenCount: [0, [Validators.required]],
    isMarried: [
      false,
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    salary: [10000, [Validators.required]],
    city: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
  });

  saveCustomer() {
    const data: Partial<Customer> = {
      name: this.form.get('name')?.value,
      address: this.form.get('address')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
      email: this.form.get('email')?.value,
      gender: this.form.get('gender')?.value,
      country: this.form.get('country')?.value,
      childrenCount: this.form.get('childrenCount')?.value,
      city: this.form.get('city')?.value,
      creditCardType: this.form.get('creditCardType')?.value,
      salary: this.form.get('salary')?.value,
      isMarried: this.form.get('isMarried')?.value,
    };
    console.log(data.salary);
    this.customerService.createCustomer(data).subscribe((response) => {
      this.router.navigate(['/customers']);
      this.customerService.showMessage('Customer created successfully!');
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.saveCustomer();
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
