import { Component, OnInit, Input } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {FunctionalAssessment} from "../../../models/functional-assessment";

@Component({
  selector: 'app-functional-assement-list',
  templateUrl: './functional-assement-list.component.html',
  styleUrls: ['./functional-assement-list.component.css']
})
export class FunctionalAssementListComponent implements OnInit {
  @Input('functionalAssessments') functionalAssessments: FunctionalAssessment[] = [];


  constructor() { }

  ngOnInit() {

  }

}
