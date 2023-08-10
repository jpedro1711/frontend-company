import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Customer } from '../components/customer/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  url: string = 'http://localhost:8080/customers';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCustomersWithPage(page: number, size: number): Observable<Customer[]> {
    const params = {
      page: page.toString(),
      limit: size.toString(),
    };

    return this.httpClient
      .get<Customer[]>(this.url, { params })
      .pipe(retry(2), catchError(this.handleError));
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  findCustomerByName(name: string) {
    const urlByName = this.url + '/name/' + name;

    return this.httpClient
      .get<Customer[]>(urlByName)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCustomerById(id: number) {
    const url = this.url + '/' + id;
    return this.httpClient
      .delete(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  findCustomerById(id: number) {
    const url = this.url + '/' + id;

    return this.httpClient
      .get<Customer>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
