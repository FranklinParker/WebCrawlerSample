import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sap-help-search',
  templateUrl: './sap-help-search.component.html',
  styleUrls: ['./sap-help-search.component.css']
})
export class SapHelpSearchComponent implements OnInit {
  helpSearch = ''
  constructor() { }

  ngOnInit() {
  }

  searchSapHelp(){
    console.log('search:' + this.helpSearch);

  }
}
