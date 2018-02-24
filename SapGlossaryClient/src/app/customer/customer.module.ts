import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import {CustomerService} from "./service/customer.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [CustomerHomeComponent],
  exports: [CustomerHomeComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
