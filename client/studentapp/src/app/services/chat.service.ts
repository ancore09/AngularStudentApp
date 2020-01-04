import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export class Msg {
  nick: string;
  bodytext: string;
  date: Date;

  constructor(nick: string, bodytext: string, date?: Date) {
    this.nick = nick;
    this.bodytext = bodytext;
    if (date) { this.date = date; }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public msgs: Msg[] = [];

  messages: Subject<any>;

  constructor(private wsService: WebsocketService, private http: HttpClient) {
    // console.log('ChatConnect');
    this.messages = wsService
      .connect() as Subject<any>;
    map((response: any): any => {
        return response;
      });
  }

  addMsg(msg) {
    this.msgs.push(msg);
  }

  loadMsgs() {
    this.http.get<any>(`${environment.ws_url}/getMsgs`).subscribe(response => {
      this.msgs = response;
    });
  }
  sendMsg(msg) {
    // console.log(this.msgs);
    // this.addMsg(msg);
    this.messages.next(msg);
  }
}
