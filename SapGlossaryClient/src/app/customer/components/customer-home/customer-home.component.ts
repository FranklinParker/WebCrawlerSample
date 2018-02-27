import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../../models/customer";

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  customers: Customer[];
  componentToShow = 'customers';

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((customers) => {
        this.customers = customers;
        console.log('customers', this.customers);

      });
  }

}
