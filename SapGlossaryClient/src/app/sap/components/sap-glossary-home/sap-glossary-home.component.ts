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
  startPos = 0;
  numberRecords = 25;
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

  moveNext(){
    this.startPos += this.numberRecords;
    this.resetSearch();
  }

  resetSearch(){
    this.sapGlossaryService.getAllSapGlossary(this.startPos,this.numberRecords)
      .subscribe((records:SapGlossary[])=>{
        this.sapGlossaries = records;
      });

  }

}
