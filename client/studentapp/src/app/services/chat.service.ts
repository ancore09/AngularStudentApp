import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class ChatService{
  public msgs: Msg[] = [];

  messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    console.log('ChatConnect');
    this.messages = wsService
      .connect() as Subject<any>;
    map((response: any): any => {
        return response;
      });
  }

  addMsg(msg) {
    this.msgs.push(msg);
  }
  sendMsg(msg) {
    console.log(this.msgs);
    // this.addMsg(msg);
    this.messages.next(msg);
  }
}
