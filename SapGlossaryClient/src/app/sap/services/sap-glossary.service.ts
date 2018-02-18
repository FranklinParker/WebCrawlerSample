import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";
import {SapGlossary} from "../../models/sap-glossary";

@Injectable()
export class SapGlossaryService {
  url = environment.serverUrl + 'api/sap';

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.url + '/getById/' + id);

  }

  /**
   * gets the sap glossary records
   *
   * @returns {Observable<SapGlossary[]>}
   */

  getAllSapGlossary(startPos,numberRecords): Observable<SapGlossary []> {
    return this.http.get(this.url +
      `/findByOffsetAndNumberRecords/${startPos}/${numberRecords}`)
      .map((response:{ status:string, records: SapGlossary []})=>{
        return response.records;

      });
  }

  //findBySoftwareComponent

  /**
   * finds sap glossary records by software component
   *
   * @returns {Observable<SapGlossary[]>}
   */

  findBySoftwareComponent(softwareComponent:string ): Observable<SapGlossary []> {
    return this.http.get(this.url + '/findBySoftwareComponent/' +
      softwareComponent)
      .map((response: { status: string, records: SapGlossary [] }) => {
        console.log(response.records);
        return response.records;

      });
  }
  //findByTermLike
  /**
   * Find sap Glossary records where the term is like
   *
   * @param {string} term
   * @returns {Observable<SapGlossary[]>}
   */
  findByTermLike(term:string ): Observable<SapGlossary []> {
    console.log('term:' + term);

    return this.http.get(this.url + '/findByTermLike/' + term)
      .map((response: { status: string, records: SapGlossary [] }) => {
        console.log(response.records);
        return response.records;

      });
  }
}
