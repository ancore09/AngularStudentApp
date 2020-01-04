import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

export class New {
  title: string;
  body: string;
  epilogue: string;

  constructor(title: string, body: string, epil: string) {
    this.title = title;
    this.body = body;
    this.epilogue = epil;
  }
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public News: New[] = [];

  constructor(private http: HttpClient) {}

  getNews() {
    this.http.get<any>(`${environment.ws_url}/test`).subscribe(response => {
      console.log(response);
      this.News = response;
    });
  }

  Add(title: string, body: string, epil: string) {
    const ew = new New(title, body, epil);
    this.News.unshift(ew);
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.http.post<any>(`${environment.ws_url}/test`, JSON.stringify(ew), {headers}).subscribe(response => {
      console.log(response);
    });
    console.log('add');
  }
}
