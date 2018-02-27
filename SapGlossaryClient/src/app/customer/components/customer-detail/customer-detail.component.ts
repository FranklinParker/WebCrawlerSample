import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Customer} from "../../../models/customer";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input('customer') customer:Customer;
  @Input('selectedId') selectedId:number;
  @Output('selectedEvent') selectedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setSelected(){
    this.selectedEvent.emit(this.customer.id);
  }

  get class(){
    return this.customer.id === this.selectedId ?
      'row customer-row-selected m-1' :
      'row customer-row m-1';
  }

}
