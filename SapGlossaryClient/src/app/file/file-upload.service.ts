import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {FileType} from "../models/file-type";

@Injectable()
export class FileUploadService {
  fileTypes: FileType[] = [
    {
      code: 'out_func_assessment',
      description: 'Functional Assessment Output',
      previewColumns: ['process_group_l1', 'module',
        'process_scenario_l2', 'process_component_l3',
        'process_component_l4', 'process_component_l5',
        'change_impact_system_analysis'
      ]
    }
  ];


  apiUrl = environment.serverUrl + 'api/fileUpload';

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File,
             sheetName: string,
             customerId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheetName', sheetName);

    formData.append('customerId', '' + customerId);

    return this.http.post(this.apiUrl + '/upload', formData);

  }

  /**
   * for excel get sheet names
   * @param {File} file
   * @returns {Observable<any>}
   */
  getSheetNames(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl + '/getExcelSheets', formData);

  }

  /**
   * for excell parse file
   *
   * @param {File} file
   * @param {string} sheetName
   * @returns {Observable<Object>}
   */
  parseExcel(file: File, sheetName: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheetName', sheetName);

    return this.http.post(this.apiUrl + '/parseExcel', formData);


  }

  /***
   * gets a list of file types
   *
   *
   * @returns {Observable}
   */
  getFileTypes(): Observable<FileType[]> {
    const fileTypeObservable =
      new Observable<FileType[]>(observer => {
        setTimeout(() => {
          observer.next(this.fileTypes);
        }, 1000);
      });
    return fileTypeObservable;
  }

}
