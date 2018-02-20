import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SapGlossary} from "../../../models/sap-glossary";
import {SapGlossaryService} from "../../services/sap-glossary.service";

@Component({
  selector: 'app-sap-glossary-list',
  templateUrl: './sap-glossary-list.component.html',
  styleUrls: ['./sap-glossary-list.component.css']
})
export class SapGlossaryListComponent implements OnInit {
  sapGlossaries:SapGlossary[] = [];
  filteredSapGlossaries:SapGlossary[] = [];
  startPos =0;
  numberRecords = 0;
  totalRecords = 0;
  recordFilterMode = 'all';

  @Output('moveNext') moveNextEvent = new EventEmitter();
  @Output('moveBack') moveBackEvent = new EventEmitter();


  constructor(private sapGlossaryService:SapGlossaryService) { }

  ngOnInit() {
    this.sapGlossaryService.refreshRecordsEvent.subscribe((event)=>{
        this.sapGlossaries = event.records;
        this.recordFilterMode = event.EventName;
        this.startPos = event.startPosition;
        this.numberRecords = event.totalRecords >event.endPosition?
                      event.endPosition:event.totalRecords;
        this.totalRecords = event.totalRecords;
        this.resetRecordFilter();
      });

  }

  /**
   *
   *
   */
  resetRecordFilter(){
    if(this.recordFilterMode==='all'){
      this.filteredSapGlossaries = this.sapGlossaries;
    }
    else if(this.sapGlossaries.length> this.numberRecords ){
      this.filteredSapGlossaries = this.sapGlossaries.slice(this.startPos,
           this.numberRecords);

    } else{
      this.filteredSapGlossaries = this.sapGlossaries;
    }
  }

  moveNext(){
    if(this.recordFilterMode==='all') {
      this.moveNextEvent.emit();
    }else{
      if(this.sapGlossaries.length> (this.startPos+ this.numberRecords)){
        this.startPos+= this.numberRecords;
        this.filteredSapGlossaries = this.sapGlossaries.slice(this.startPos,
          this.startPos+this.numberRecords);
      }
    }

  }

  moveBack(){
    this.moveBackEvent.emit();

  }

}
