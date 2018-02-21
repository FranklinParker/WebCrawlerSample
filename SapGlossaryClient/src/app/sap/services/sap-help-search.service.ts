import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {SapGlossary} from "../../models/sap-glossary";

@Injectable()
export class SapHelpSearchService {
  url = environment.serverUrl + 'api/saphelp';
  constructor(private http: HttpClient) { }

  /**
   * calls sap help end point
   *
   *
   * @param helpSearch
   * @returns {Observable<any>}
   */
  findSapHelp(helpSearch): Observable<any> {
    return this.http.get(this.url + '/findHelpBy/' + helpSearch )
      .map((response) => {
        return response;
      });
  }

}
