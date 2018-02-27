import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import {CustomerService} from "./service/customer.service";
import {HttpClientModule} from "@angular/common/http";
import { FunctionalAssementListComponent } from './components/functional-assement-list/functional-assement-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [CustomerHomeComponent, FunctionalAssementListComponent, CustomerDetailComponent],
  exports: [CustomerHomeComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
