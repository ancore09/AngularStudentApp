import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private user: UserService) { }

  isAuth() {
    return this.router.url === '/auth' || this.router.url === '/';
  }

  logOut() {
    this.user.user = null;
    this.user.isLogin = false;
    this.user.isAdmin = false;
    this.router.navigate(['/']);
  }
}
