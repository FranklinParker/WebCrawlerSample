import {Component, Input, OnInit} from '@angular/core';
import {SapGlossaryService} from "../../services/sap-glossary.service";
import {SapGlossary} from "../../../models/sap-glossary";

@Component({
  selector: 'app-sap-glossary-home',
  templateUrl: './sap-glossary-home.component.html',
  styleUrls: ['./sap-glossary-home.component.css']
})
export class SapGlossaryHomeComponent implements OnInit {
  sapGlossaries:SapGlossary[] = [];
  constructor(private sapGlossaryService:SapGlossaryService) { }

  ngOnInit() {
    this.resetSearch();

  }

  searchSoftwareComponentEvent(softwareComponent: string){
    console.log('searchSoftwareComponentEvent($event):'+ softwareComponent);
    this.sapGlossaryService.findBySoftwareComponent(softwareComponent)
      .subscribe((records:SapGlossary[])=>{
        this.sapGlossaries = records;
      });

  }

  resetSearch(){
    this.sapGlossaryService.getAllSapGlossary()
      .subscribe((records:SapGlossary[])=>{
        this.sapGlossaries = records;
      });

  }

}
