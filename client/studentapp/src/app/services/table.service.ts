import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, UserService} from './user.service';
import {environment} from '../../environments/environment';

export class Class {
  id: number;
  date: string;
  theme: string;
  homework: string;
  mark: number;
  comment: string;

  constructor(id: number, date: string, theme: string, homework: string, mark: number, comment: string) {
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
  users: User[] = [];

  constructor(private http: HttpClient, public user: UserService) {}

  getTable() {
    this.http.get<any>(`${environment.ws_url}/getTableTest`).subscribe(res => {
      this.table = res;
      if (!this.user.isAdmin) {
        this.insertMarks();
      } else {
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.http.get<any>(`${environment.ws_url}/getUsers`).subscribe(response => {
      this.users = response;
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

  changeClass(id: number, type: string, data: string) {
    switch (type) {
      case 'date':
        this.table.find( lesson => lesson.id === id).date = data;
        break;
      case 'theme':
        this.table.find( lesson => lesson.id === id).theme = data;
        break;
      case 'comment':
        this.table.find( lesson => lesson.id === id).comment = data;
        break;
      case 'homework':
        this.table.find( lesson => lesson.id === id).homework = data;
        break;
    }
    this.http.put(`${environment.ws_url}/changeClass?id=${id}`, {data, type}).subscribe();
  }

  addClass(date, theme, homework, comment) {
    const lesson = new Class(this.table.length, date, theme, homework, 0, comment);
    this.table.push(lesson);
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.http.post(`${environment.ws_url}/addClass`, JSON.stringify(lesson), {headers}).subscribe();
    console.log(this.table);
  }

  putMark(login: string, id: number, data: string) {
    this.http.put(`${environment.ws_url}/putMark`, {id: id, data: data, login: login}).subscribe();
    this.users.find(user => user.login === login).marks.find(mark => mark.id === id).mark = Number(data);
  }
}
