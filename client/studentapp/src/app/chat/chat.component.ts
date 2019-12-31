import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService, Msg} from '../services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    console.log(this.chat);
    console.log('Init');
    this.subscription = this.chat.messages.subscribe(msg => {
      this.chat.addMsg(msg.body);
      // msg.text = msg.text.replace('"', '');
      // msg.text = msg.text.replace('"', '');
      console.log(msg);
    });
    console.log(this.subscription);
  }

  sendMessage(msg, nick) {
    const mes = new Msg(nick, msg);
    this.chat.sendMsg(mes);
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


