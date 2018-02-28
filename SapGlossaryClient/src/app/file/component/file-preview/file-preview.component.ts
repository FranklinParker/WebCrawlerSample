import {Component, Input, OnInit} from '@angular/core';
import {FileResults} from "../../../models/file-results";

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {
  @Input('fileResults') fileResults: FileResults;
  constructor() { }

  ngOnInit() {
  }

}
