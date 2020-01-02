import { Component, OnInit } from '@angular/core';
import {TableService} from '../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private tabl: TableService) { }

  ngOnInit() {
    this.tabl.getTable();
  }

}
