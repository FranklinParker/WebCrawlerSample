import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../../models/customer";
import {FunctionalAssessment} from "../../../models/functional-assessment";

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  customers: Customer[];
  selectedId = 0;
  functionalAssessments: FunctionalAssessment[] = [];


  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((customers) => {
        this.customers = customers;
        console.log('customers', this.customers);

      });
  }

  selectCustomer(id: number){
    this.selectedId = id;
    const customer = this.customers.find(cust=> cust.id===this.selectedId);

    this.customerService.getFunctionalAssessmentsByCustomer(customer)
      .subscribe((funcAsses)=>{
        this.functionalAssessments =funcAsses;
      });
  }
}
