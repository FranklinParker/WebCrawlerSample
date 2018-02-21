import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SapGlossaryHomeComponent } from './components/sap-glossary-home/sap-glossary-home.component';
import { SapGlossarySearchComponent } from './components/sap-glossary-search/sap-glossary-search.component';
import {FormsModule} from "@angular/forms";
import {SapGlossaryService} from "./services/sap-glossary.service";
import {HttpClientModule} from "@angular/common/http";
import { SapGlossaryListComponent } from './components/sap-glossary-list/sap-glossary-list.component';
import { SapGlossaryDetailComponent } from './components/sap-glossary-detail/sap-glossary-detail.component';
import { SapHelpSearchComponent } from './components/sap-help-search/sap-help-search.component';
import {SapHelpSearchService} from "./services/sap-help-search.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [SapGlossaryHomeComponent,
    SapGlossarySearchComponent,
    SapGlossaryListComponent,
    SapGlossaryDetailComponent,
    SapHelpSearchComponent],
  exports: [SapGlossaryHomeComponent,
    SapHelpSearchComponent],
  providers: [SapGlossaryService,
  SapHelpSearchService]
})
export class SapModule { }
