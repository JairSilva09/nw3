import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss']
})
export class ContentTableComponent implements OnInit {

  @Input() slideData: any;
  @Output() pageNumberChange : EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  pageNumberChangeEvent(i:any){
    this.pageNumberChange.emit(i+1);
  }

}
