import {Component, Input, OnInit} from '@angular/core';
import {SapLink} from "../../../models/sap-link";

@Component({
  selector: 'app-sap-help-search-detail',
  templateUrl: './sap-help-search-detail.component.html',
  styleUrls: ['./sap-help-search-detail.component.css']
})
export class SapHelpSearchDetailComponent implements OnInit {
  @Input('sapLink') sapLink: SapLink;
  constructor() { }

  ngOnInit() {
  }

}
