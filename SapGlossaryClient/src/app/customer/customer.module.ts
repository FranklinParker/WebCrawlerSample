import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import {CustomerService} from "./service/customer.service";
import {HttpClientModule} from "@angular/common/http";
import { FunctionalAssementListComponent } from './components/functional-assement-list/functional-assement-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [CustomerHomeComponent, FunctionalAssementListComponent],
  exports: [CustomerHomeComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
