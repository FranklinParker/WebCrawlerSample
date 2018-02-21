import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {SapGlossary} from "../../models/sap-glossary";

@Injectable()
export class SapHelpSearchService {
  sapHelpBaseUrl = environment.sapHelpBaseUrl;

  constructor(private http: HttpClient) { }

  findSapHelp(helpSearch): Observable<any> {
    let params = new HttpParams();
    //q=BPM&language=en-US&state=PRODUCTION
    params = params.append('q', helpSearch);
    params = params.append('language', 'en-US');
    params = params.append('state', 'PRODUCTION');


    return this.http.get(this.sapHelpBaseUrl , {params:params})
      .map((response) => {
        return response
      });
  }

}
