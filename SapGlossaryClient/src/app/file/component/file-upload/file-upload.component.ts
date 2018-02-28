import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../file-upload.service";
import {CustomerService} from "../../../customer/service/customer.service";
import {Customer} from "../../../models/customer";
import {FileResults} from "../../../models/file-results";


interface FileType {
  code: string;
  description: string;
  previewColumns: string[];


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
  fileResults: FileResults;
  customers: Customer[] = [];
  fileTypes: FileType[] = [
    {
      code: 'out_func_assessment',
      description: 'Functional Assessment Output',
      previewColumns : ['process_group_l1','module',
        'process_scenario_l2','process_component_l3',
        'process_component_l4','process_component_l5',
        'change_impact_system_analysis'
      ]
    }
  ];



  mimeTypesExcel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    , 'application/vnd.ms-excel'];

  constructor(private fileUploadService: FileUploadService,
              private customerService: CustomerService) {
  }

  /**
   *
   *
   */
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

  /**
   * parse the file on server if it is excell
   *
   *
   */
  parseExcel() {
    console.log('fileTypeCode:'+ this.fileTypeCode);
    console.log('customerId:'+ this.customerId);
    if(!this.fileTypeCode){
      alert('You select a file type');
      return;
    }
    this.fileUploadService.parseExcel(this.file, this.selectedSheet)
      .subscribe((resp) => {
        const columnsToShow = this.fileTypes.find((fileType)=> fileType.code === this.fileTypeCode).previewColumns;
        this.fileResults ={
          records: resp['data'],
          columnsToView: columnsToShow
        };
        console.log('fileResults', this.fileResults);
      });
  }

  /**
   * upload file
   *
   *
   */
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

  /**
   *
   * @returns {File | boolean | string | undefined}
   */
  get mimeTypeExcel(): boolean | string{

    return this.file
      && this.isMimeTypeExcel();

  }

  /**
   *
   * @returns {any}
   */
  isMimeTypeExcel() {
    if (!this.file) {
      return false;
    }
    const typeExcelFound = this.mimeTypesExcel.find((type) => type === this.file.type);
    return typeExcelFound;

  }

}
