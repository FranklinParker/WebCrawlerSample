import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sap-glossary-search',
  templateUrl: './sap-glossary-search.component.html',
  styleUrls: ['./sap-glossary-search.component.css']
})
export class SapGlossarySearchComponent implements OnInit {
  searchTerm ='test';
  constructor() { }

  ngOnInit() {
  }

  /**
   * search term
   *
   */
  searchSapGlossaryTerm(){
    console.log('searchTerm:'+ this.searchTerm)
  }

}
