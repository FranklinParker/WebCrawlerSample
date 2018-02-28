import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../file-upload.service";
import {CustomerService} from "../../../customer/service/customer.service";
import {Customer} from "../../../models/customer";


interface FileType {
  code: string;
  description: string;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file: File;
  fileTypeCode: string;
  excelSheetNames = [];
  selectedSheet: string;
  customerId: number;
  customers: Customer[] = [];
  fileTypes: FileType[] = [
    {
      code: 'out_func_assessment',
      description: 'Functional Assessment Output'
    }
  ]

  mimeTypesExcel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    , 'application/vnd.ms-excel'];

  constructor(private fileUploadService: FileUploadService,
              private customerService: CustomerService) {


  }

  ngOnInit() {
    this.customerService.getAllCustomers()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      })


  }

  /**
   * event when file is selected
   *
   * @param {FileList} files
   */
  handleFileInput(files: FileList) {
    this.file = files.item(0);
    if (this.mimeTypeExcel) {
      this.getSheetNames();

    }
  }

  parseExcel() {
    console.log('fileTypeCode:'+ this.fileTypeCode);
    console.log('customerId:'+ this.customerId);



    this.fileUploadService.parseExcel(this.file, this.selectedSheet)
      .subscribe((resp) => {
        console.log('parse result',
          resp);
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
   * get the sheet names for an excell file
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

  isMimeTypeExcel() {
    if (!this.file) {
      return false;
    }
    const typeExcelFound = this.mimeTypesExcel.find((type) => type === this.file.type);
    return typeExcelFound;

  }

}
