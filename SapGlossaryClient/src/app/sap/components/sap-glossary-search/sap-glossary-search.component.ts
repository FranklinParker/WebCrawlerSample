import { Component, OnInit } from '@angular/core';
import {SapGlossaryService} from "../../services/sap-glossary.service";

@Component({
  selector: 'app-sap-glossary-search',
  templateUrl: './sap-glossary-search.component.html',
  styleUrls: ['./sap-glossary-search.component.css']
})
export class SapGlossarySearchComponent implements OnInit {
  softwareComponent ='BC-ABA';
  constructor(private sapService:SapGlossaryService) { }

  ngOnInit() {
  }

  /**
   * search term
   *
   */
  searchSapGlossaryBySoftwareComponent(){
    console.log('softwareComponent:'+ this.softwareComponent);
    this.sapService.getSapGlossaryTermBySoftwareComponent(this.softwareComponent)
      .subscribe((resp)=>{
        console.log('search result', resp);
      });
  }

}
