import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CustomerHomeComponent],
  exports: [CustomerHomeComponent]
})
export class CustomerModule { }
