import { Component, OnInit } from '@angular/core';
import {SapHelpSearchService} from "../../services/sap-help-search.service";
import {SapContentLinks} from "../../../models/sap-content-links";
import {SapProductSearchLinks} from "../../../models/sap-product-search-links";

@Component({
  selector: 'app-sap-help-search',
  templateUrl: './sap-help-search.component.html',
  styleUrls: ['./sap-help-search.component.css']
})
export class SapHelpSearchComponent implements OnInit {
  helpSearch = ''
  sapContentLinks: SapContentLinks;
  sapProductSearchLinks: SapProductSearchLinks;
  constructor(private sapHelpSearchService: SapHelpSearchService) { }

  ngOnInit() {
  }

  searchSapHelp(){
    console.log('search:' + this.helpSearch);
    this.sapHelpSearchService.findSapHelp(this.helpSearch)
      .subscribe((data :
                    { content: SapContentLinks, product: SapProductSearchLinks })=>{
        this.sapProductSearchLinks = data.product;
        this.sapContentLinks = data.content;
        console.log('sapProductSearchLinks', this.sapProductSearchLinks);
        console.log('sapContentLinks', this.sapContentLinks);

      });

  }
}
