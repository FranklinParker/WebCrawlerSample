import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SapHelpSearchService {
  url = environment.serverUrl + 'api/saphelp';
  constructor(private http: HttpClient) { }

  /**
   * calls api on server to search sap help
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
