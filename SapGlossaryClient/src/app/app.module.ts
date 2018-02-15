import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SapModule} from "./sap/sap.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
