import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SapModule} from "./sap/sap.module";
import {AppRoutingModule} from "./app-routing.module";
import {CustomerModule} from "./customer/customer.module";
import { FileUploadComponent } from './file/component/file-upload/file-upload.component';
import {FileUploadService} from "./file/file-upload.service";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    SapModule,
    AppRoutingModule,
    CustomerModule,
    FormsModule
  ],
  providers: [FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
