import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { HomeComponent } from './components/template/home/home.component';
import { DeleteCustomerComponent } from './components/customer/delete-customer/delete-customer.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'deleteCustomer/:id', component: DeleteCustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
