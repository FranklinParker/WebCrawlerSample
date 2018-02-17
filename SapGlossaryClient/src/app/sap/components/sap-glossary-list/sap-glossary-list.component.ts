import {Component, Input, OnInit} from '@angular/core';
import {SapGlossary} from "../../../models/sap-glossary";
import {SapGlossaryService} from "../../services/sap-glossary.service";

@Component({
  selector: 'app-sap-glossary-list',
  templateUrl: './sap-glossary-list.component.html',
  styleUrls: ['./sap-glossary-list.component.css']
})
export class SapGlossaryListComponent implements OnInit {
  @Input('sapGlossaries') sapGlossaries:SapGlossary[] = [];
  @Input('startPos') startPos;
  @Input('numberRecords') numberRecords;

  constructor() { }

  ngOnInit() {


  }

}
