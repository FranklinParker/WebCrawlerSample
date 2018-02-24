import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SapGlossary} from "../../models/sap-glossary";
import {Observable} from "rxjs/Observable";
import {Customer} from "../../models/customer";

@Injectable()
export class CustomerService {
  url = environment.serverUrl + 'api/customers';


  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get(this.url + '/getAll')
      .map((response:{ status:string, records: Customer[]})=>{
        return response.records;
      });
  }


}
