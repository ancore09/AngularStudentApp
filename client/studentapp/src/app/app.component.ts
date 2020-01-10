import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private user: UserService, private cookie: CookieService) { }

  isAuth() {
    return this.router.url === '/auth' || this.router.url === '/';
  }

  logOut() {
    this.cookie.deleteAll();
    this.user.cookies = false;
    this.user.user.login = '';
    this.user.user.password = '';
    this.user.user.nick = '';
    if (this.user.isAdmin) { this.user.user.marks = []; }
    this.user.isLogin = false;
    this.user.isAdmin = false;
    this.user.user.course = '';
      this.router.navigate(['/']);
  }
}
