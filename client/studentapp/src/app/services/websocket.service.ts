import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

  private socket;
  private observable;
  private observer;

  constructor(public user: UserService) { }

  connect(): Rx.Subject<MessageEvent> {
    console.log('connect');
    this.socket = io(`${environment.ws_url}?room=${this.user.user.course}`);

    // tslint:disable-next-line:no-shadowed-variable
    this.observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        // console.log('Mes received!');
        // console.log(data);
        observer.next(data);
      });
      return () => {
         // this.socket.emit('leave');
         this.socket.disconnect();
      };
    });

    this.observer = {
      next: (data: Object) => {
        this.socket.emit('message', data/*, this.user.user.course*/);
        console.log(data);
      }
    };

    return Rx.Subject.create(this.observer, this.observable);
  }
}
