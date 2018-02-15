import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SapGlossaryHomeComponent } from './components/sap-glossary-home/sap-glossary-home.component';
import { SapGlossarySearchComponent } from './components/sap-glossary-search/sap-glossary-search.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SapGlossaryHomeComponent, SapGlossarySearchComponent],
  exports: [SapGlossaryHomeComponent]
})
export class SapModule { }
