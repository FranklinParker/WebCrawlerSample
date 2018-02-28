import { Component, OnInit } from '@angular/core';
import {FileUploadService} from "../../file-upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file: File;
  excelSheetNames = [];
  selectedSheet: string;
  mimeTypesExcel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ,'application/vnd.ms-excel'];

  constructor(private fileUploadService: FileUploadService){
    
  }

  ngOnInit() {


  }

  /**
   * event when file is selected
   *
   * @param {FileList} files
   */
  handleFileInput(files: FileList) {
    this.file = files.item(0);
    console.log('file change', this.file);
    if (this.mimeTypeExcel) {
      this.getSheetNames();

    }
  }

  parseExcel() {
    this.fileUploadService.parseExcel(this.file, this.selectedSheet)
      .subscribe((resp) => {

      });
  }

  uploadFile() {
    if (this.file) {
      this.fileUploadService.uploadFile(this.file).subscribe((resp) => {
        console.log('upload ', resp);
      });
    } else {
      alert('Please select a file');
    }
  }

  /**
   *
   *
   */
  getSheetNames() {
    this.fileUploadService.getSheetNames(this.file).subscribe((resp) => {
      if (resp.result === 'success') {
        this.excelSheetNames = resp.sheetNames;
      } else {
        alert('error getting sheet names');
      }
    });
  }

  get mimeTypeExcel() {

    return this.file
      && this.isMimeTypeExcel();

  }

  isMimeTypeExcel(){
    if(!this.file){
      return false;
    }
    const typeExcelFound = this.mimeTypesExcel.find((type) => type ===this.file.type );
    return typeExcelFound;

  }

}
