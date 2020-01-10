import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: string;
  password: string;
  course: string;

  constructor(private http: HttpClient, private user: UserService, private router: Router, private cookie: CookieService) {
  }

  ngOnInit() {
    if (this.user.cookies) {
      this.router.navigate(['/news']);
    }
  }

  Auth() {
    this.http.get<any>(`${environment.ws_url}/authUser?login=${this.login}&pass=${this.password}&course=${this.course}`).subscribe(response => {
      console.log(response);
      if (response) {
        this.user.user.course = this.course;
        this.user.user.nick = response.nick;
        this.user.user.login = response.login;
        this.user.user.password = response.password;
        if (response.marks) { this.user.user.marks = response.marks; }
        if (response.admin) { this.user.isAdmin = true; }
        console.log(this.user.user);
        this.user.isLogin = true;
        this.cookie.set('login', this.login);
        this.cookie.set('pass', this.password);
        this.cookie.set('course', this.course);
        this.cookie.set('nick', response.nick);
        this.router.navigate(['/news']);
      } else {
        alert('Invalid login or password');
      }
    });
  }

}
