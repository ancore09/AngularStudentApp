import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

export class Class {
  id: number;
  date: string;
  theme: string;
  homework: string;
  mark: symbol;
  comment: string;

  constructor(id: number, date: string, theme: string, homework: string, mark: symbol, comment: string) {
    this.id = id;
    this.date = date;
    this.theme = theme;
    this.homework = homework;
    this.mark = mark;
    this.comment = comment;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TableService {

  table: Class[] = [];
  userMarks = [];

  constructor(private http: HttpClient, private user: UserService) {}

  getTable() {
    this.http.get<any>('http://localhost:3000/getTableTest').subscribe(res => {
      this.table = res;
      this.insertMarks();
    });
  }

  insertMarks() {
    let i = 0;
    this.user.user.marks.forEach( mark => {
      if (this.table[i].id === mark.id) {
        this.table[i].mark = mark.mark;
        i = i + 1;
      }
    });
    console.log(this.table);
  }
}
