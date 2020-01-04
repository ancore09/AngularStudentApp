import { Component, OnInit } from '@angular/core';
import {TableService} from '../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  date: string;
  theme: string;
  homework: string;
  comment: string;

  toggleForm = false;
  toggleText = 'Show Add Form';

  toggleJournal = true;

  constructor(private tabl: TableService) { }

  ngOnInit() {
    this.tabl.getUserMarks();
    this.tabl.getTable();
  }

  toggle() {
    this.tabl.getUsers();
    this.toggleForm = !this.toggleForm;
    if (this.toggleForm) {
      this.toggleText = 'Hide Add Form';
    } else {
      this.toggleText = 'Show Add Form';
    }
  }

  toggleJournalf() {
    this.tabl.getUsers();
    setTimeout(() => {
      this.toggleJournal = !this.toggleJournal;
    }, 1);
  }

  changeClass(id: number, type: string) {
    const newData = prompt(`Enter new ${type}`);
    this.tabl.changeClass(id, type, newData);
  }

  addClass() {
    this.tabl.addClass(this.date, this.theme, this.homework, this.comment);
    this.tabl.getUsers();
  }

  putMark(id: number, login: string) {
    console.log('click');
    const data = prompt('Enter new mark');
    this.tabl.putMark(login, id, data);
  }

}
