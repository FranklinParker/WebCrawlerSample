import { Component, OnInit } from '@angular/core';
import {SapGlossaryService} from "../../services/sap-glossary.service";
import {SapGlossary} from "../../../models/sap-glossary";

@Component({
  selector: 'app-sap-glossary-search',
  templateUrl: './sap-glossary-search.component.html',
  styleUrls: ['./sap-glossary-search.component.css']
})
export class SapGlossarySearchComponent implements OnInit {
  softwareComponent ='BC-ABA';
  sapGlossary:SapGlossary;

  constructor(private sapService:SapGlossaryService) { }

  ngOnInit() {
  }

  /**
   * search term
   *
   */
  searchSapGlossaryBySoftwareComponent(){
    console.log('softwareComponent:'+ this.softwareComponent);
     this.sapService.getAllSapGlossary()
      .subscribe((resp)=>{
         console.log('search result', resp);
         //this.sapGlossary = resp.doc;
         //console.log('sapGlossary', this.sapGlossary);
      });

  }

}
