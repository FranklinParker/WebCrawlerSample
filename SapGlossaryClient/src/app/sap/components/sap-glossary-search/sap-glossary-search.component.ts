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
  }

  reset(){
    this.resetSearch.emit();
  }
  searchByTerm(){
    this.termSearchEvent.emit(this.term);
  }

  searchForBlankText(){
    this.blankTextSearchEvent.emit();
  }

}
