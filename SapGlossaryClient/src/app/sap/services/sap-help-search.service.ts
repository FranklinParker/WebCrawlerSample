import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {SapProductSearchLinks} from "../../models/sap-product-search-links";
import {SapContentLinks} from "../../models/sap-content-links";

@Injectable()
export class SapHelpSearchService {
  url = environment.serverUrl + 'api/saphelp';

  constructor(private http: HttpClient) {
  }

  /**
   * calls api on server to search sap help
   *
   *
   * @param helpSearch
   * @returns {Observable<any>}
   */
  findSapHelp(helpSearch): Observable<{ content: SapContentLinks, product: SapProductSearchLinks }> {
    return this.http.get(this.url + '/findHelpBy/' + helpSearch)
      .map((response) => {
        let sapProduct: SapProductSearchLinks = {
          search: response['searchTerm'],
          sapLinks: response['productSearchLinks'].suggestions
        };
        let sapContent: SapContentLinks = {
          search: response['searchTerm'],
          sapLinks: response['contentLinks'].suggestions
        };

        return {
          content: sapContent,
          product: sapProduct
        };
      });
  }

}
