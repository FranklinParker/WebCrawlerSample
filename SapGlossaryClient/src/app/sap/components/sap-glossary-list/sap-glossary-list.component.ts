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
  startPos =0;
  numberRecords = 0;
  recordFilterMode = 'all';
  @Output('moveNext') moveNextEvent = new EventEmitter();
  @Output('moveBack') moveBackEvent = new EventEmitter();


  constructor(private sapGlossaryService:SapGlossaryService) { }

  ngOnInit() {
    this.sapGlossaryService.refreshRecordsEvent.subscribe((event)=>{
         console.log('refresh event:' + event.EventName+ ' sapGlossaries', this.sapGlossaries);
        this.sapGlossaries = event.records;
        this.recordFilterMode = event.EventName;
        this.startPos = event.startPosition;
        this.numberRecords = event.endPosition;
      });

  }

  resetRecordFilter(){

  }

  moveNext(){
    this.moveNextEvent.emit();

  }

  moveBack(){
    this.moveBackEvent.emit();

  }

}
