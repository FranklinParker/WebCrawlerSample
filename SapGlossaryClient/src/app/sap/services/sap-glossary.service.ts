import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable()
export class SapGlossaryService {
  url = environment.serverUrl + 'api/sap';

  constructor(private http: HttpClient) {
  }

  getSapGlossaryTermBySoftwareComponent(softwareComponent: string): Observable<any> {
    return this.http.get(this.url + '/getBySoftwareComponent/' + softwareComponent);

  }

  getAllSapGlossary(): Observable<any> {
    return this.http.get(this.url + '/getAll');
  }

}
