import {Component, Input, OnInit} from '@angular/core';
import {SapGlossary} from "../../../models/sap-glossary";

@Component({
  selector: 'app-sap-glossary-detail',
  templateUrl: './sap-glossary-detail.component.html',
  styleUrls: ['./sap-glossary-detail.component.css']
})
export class SapGlossaryDetailComponent implements OnInit {
  @Input('sapGlossary') sapGlossary:SapGlossary;
  constructor() { }

  ngOnInit() {
  }

}
