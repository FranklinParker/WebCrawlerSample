import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {FunctionalAssessment} from "../../../models/functional-assessment";

@Component({
  selector: 'app-functional-assement-list',
  templateUrl: './functional-assement-list.component.html',
  styleUrls: ['./functional-assement-list.component.css']
})
export class FunctionalAssementListComponent implements OnInit {
  functionalAssessments: FunctionalAssessment[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllFunctionalAssessments()
      .subscribe((records : FunctionalAssessment[])=>{
        this.functionalAssessments = records;
      })
  }

}
