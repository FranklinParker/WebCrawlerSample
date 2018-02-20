import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";
import {SapGlossary} from "../../models/sap-glossary";

@Injectable()
export class SapGlossaryService {
  url = environment.serverUrl + 'api/sap';
  refreshRecordsEvent = new EventEmitter();


  constructor(private http: HttpClient) {
  }

  /***
   *
   * get by id
   *
   * @param {string} id
   * @returns {Observable<any>}
   */
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
        this.refreshRecordsEvent.emit({
          EventName: 'all',
          records: response.records,
          startPosition: startPos,
          endPosition: numberRecords
        });
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
        this.refreshRecordsEvent.emit({
          EventName: 'softwareComponent',
          records: response.records,
          startPosition: 0,
          endPosition: 25
        });
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
        this.refreshRecordsEvent.emit({
          EventName: 'term',
          records: response.records,
          startPosition: 0,
          endPosition: 25
        });
        return response.records;

      });
  }

  /**
   * Search where text blank
   *
   * @returns {Observable<SapGlossary[]>}
   */
  findWhereTextBlank(): Observable<SapGlossary []> {

    return this.http.get(this.url + '/findWhereTextBlank')
      .map((response: { status: string, records: SapGlossary [] }) => {
        console.log('searchTextBlank',response.records);
        this.refreshRecordsEvent.emit({
          EventName: 'searchTextBlank',
          records: response.records,
          startPosition: 0,
          endPosition: 25
        });
        return response.records;

      });
  }

  /**
   * Search where text like
   *
   * @returns {Observable<SapGlossary[]>}
   */
  findWhereTextLike(text): Observable<SapGlossary []> {
    let params = new HttpParams();
    params = params.append('text', text);

    return this.http.get(this.url + '/findWhereTextLike', {params:params})
      .map((response: { status: string, records: SapGlossary [] }) => {
        this.refreshRecordsEvent.emit({
          EventName: 'searchTextLike',
          records: response.records,
          startPosition: 0,
          endPosition: 25
        });
        return response.records;

      });
  }

}
