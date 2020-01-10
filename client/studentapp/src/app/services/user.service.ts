import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

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
  course: string;

  constructor(login: string, password: string, nick: string, course: string, marks?: Mark[]) {
    this.login = login;
    this.password = password;
    this.nick = nick;
    this.course = course;
    this.marks = marks;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User('', '', '', '');
  cookies = false;
  isLogin = false;
  isAdmin = false;

  constructor(private cookie: CookieService) {
    if (cookie.get('login') && cookie.get('pass') && cookie.get('course')) {
      this.cookies = true;
      this.user.course = cookie.get('course');
      this.user.nick = cookie.get('nick');
      this.user.login = cookie.get('login');
      this.user.password = cookie.get('pass');
    }
  }
}
