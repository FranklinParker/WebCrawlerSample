import { Component, OnInit } from '@angular/core';
import {SapHelpSearchService} from "../../services/sap-help-search.service";

@Component({
  selector: 'app-sap-help-search',
  templateUrl: './sap-help-search.component.html',
  styleUrls: ['./sap-help-search.component.css']
})
export class SapHelpSearchComponent implements OnInit {
  helpSearch = ''
  constructor(private sapHelpSearchService: SapHelpSearchService) { }

  ngOnInit() {
  }

  searchSapHelp(){
    console.log('search:' + this.helpSearch);
    this.sapHelpSearchService.findSapHelp(this.helpSearch)
      .subscribe((data)=>{
        console.log('search results', data);
      });

  }
}
