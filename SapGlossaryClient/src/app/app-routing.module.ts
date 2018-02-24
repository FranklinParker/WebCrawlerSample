import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SapGlossaryHomeComponent} from "./sap/components/sap-glossary-home/sap-glossary-home.component";
import {SapHelpSearchComponent} from "./sap/components/sap-help-search/sap-help-search.component";
import {CustomerHomeComponent} from "./customer/components/customer-home/customer-home.component";


const routes: Routes = [
  { path: '', component: SapGlossaryHomeComponent },
  { path: 'sap/help/search', component: SapHelpSearchComponent},
  { path: 'customer', component: CustomerHomeComponent}



];
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
