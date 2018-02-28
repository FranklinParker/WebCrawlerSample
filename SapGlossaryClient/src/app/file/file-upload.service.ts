import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FileUploadService {


  apiUrl = environment.serverUrl +'api/fileUpload';
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl+'/upload', formData);

  }


  getSheetNames(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl+'/getExcelSheets', formData);

  }

  parseExcel(file:File, sheetName:string){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheetName', sheetName);

    return this.http.post(this.apiUrl+'/parseExcel', formData);


  }

}
