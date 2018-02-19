import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SapGlossaryService} from "../../services/sap-glossary.service";
import {SapGlossary} from "../../../models/sap-glossary";

@Component({
  selector: 'app-sap-glossary-search',
  templateUrl: './sap-glossary-search.component.html',
  styleUrls: ['./sap-glossary-search.component.css']
})
export class SapGlossarySearchComponent implements OnInit {
  softwareComponent ='BC-ABA';
  term = '';
  sapGlossary:SapGlossary;
  showSearch = false;
  searchType = 'All Records';

  @Output('searchSoftwareComponentEvent') searchSoftwareComponentEvent = new EventEmitter();
  @Output('termSearchEvent') termSearchEvent = new EventEmitter();
  @Output('blankTextSearchEvent') blankTextSearchEvent = new EventEmitter();
  @Output('resetSearch') resetSearch = new EventEmitter();


  constructor(private sapService:SapGlossaryService) { }

  ngOnInit() {
  }

  /**
   * search by software component
   *
   */
  searchSapGlossaryBySoftwareComponent(){
    this.searchSoftwareComponentEvent.emit(this.softwareComponent);
    this.searchType = `Search Where Software Component equals ${this.softwareComponent}`

    this.showSearch = false;

  }

  /**
   * get all records
   *
   */
  reset(){
    this.resetSearch.emit();
    this.showSearch = false;
    this.searchType = 'All Records';

  }

  /***
   * search by term
   *
   *
   */
  searchByTerm(){
    this.termSearchEvent.emit(this.term);
    this.searchType = `Search Where Term Starts with ${this.term}`
    this.showSearch = false;
  }

  /**
   * search for blank text
   *
   */
  searchForBlankText(){
    this.blankTextSearchEvent.emit();
    this.searchType = 'Search Where Text is blank';

    this.showSearch = false;

  }

}
