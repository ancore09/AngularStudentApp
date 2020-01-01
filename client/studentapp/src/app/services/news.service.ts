import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  public News: New[] = [
    // {title: 'Third New',
    //   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
    //     ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
    //     'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    //     'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ' +
    //     'amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
    //     ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
    //     'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
    //     'qui officia deserunt mollit anim id est laborum',
    //   epilogue: 'Once Told me3'},
    // {title: 'Second New',
    //   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
    //     ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
    //     'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    //     'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ' +
    //     'amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
    //     ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
    //     'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
    //     'qui officia deserunt mollit anim id est laborum',
    //   epilogue: 'Once Told me2'},
    // {title: 'First New',
    //   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
    //     ' labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
    //     'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    //     'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit ' +
    //     'amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
    //     ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
    //     'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
    //     'qui officia deserunt mollit anim id est laborum',
    //   epilogue: 'Once Told me1'}
  ];

  constructor(private http: HttpClient) {}

  getNews() {
    this.http.get<any>('http://localhost:3000/test').subscribe(response => {
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
    this.http.post<any>('http://localhost:3000/test', JSON.stringify(ew), {headers: headers}).subscribe(response => {
      console.log(response);
    });
    console.log('add');
  }
}
