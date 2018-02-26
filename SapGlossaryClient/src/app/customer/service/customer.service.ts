import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Customer} from "../../models/customer";
import {FunctionalAssessment} from "../../models/functional-assessment";

@Injectable()
export class CustomerService {
  url = environment.serverUrl + 'api/customers';
  urlFunctionalAssessment = environment.serverUrl + 'api/functionalAssessments';


  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get(this.url + '/getAll')
      .map((response:{ status:string, records: Customer[]})=>{
        return response.records;
      });
  }

  getAllFunctionalAssessments(): Observable<FunctionalAssessment[]> {
    return this.http.get(this.urlFunctionalAssessment + '/getAll')
      .map((response:{ status:string, records: FunctionalAssessment[]})=>{
        return response.records;
      });
  }



}
