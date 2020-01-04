import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Mark {
  id: number;
  mark: number;

  constructor(id: number, mark: number) {
    this.id = id;
    this.mark = mark;
  }
}

export class User {
  login: string;
  password: string;
  nick: string;
  marks?: Mark[];

  constructor(login: string, password: string, nick: string, marks?: Mark[]) {
    this.login = login;
    this.password = password;
    this.nick = nick;
    this.marks = marks;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User('', '', '');
  isLogin = false;
  isAdmin = false;

  constructor(/*private http: HttpClient*/) {
    // this.http.get<any>(`http://localhost:3000/getUserMarksTest?login=${this.user.login}`).subscribe(response => {
    //   console.log(response);
    //   this.user.marks = response;
    // });
  }
}
