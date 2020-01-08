import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService, Msg} from '../services/chat.service';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private chat: ChatService, private usr: UserService) { }

  ngOnInit() {
    this.chat.loadMsgs();
    this.subscription = this.chat.messages.subscribe(msg => {
        this.chat.addMsg(msg.body);
        // console.log(msg);
    });
  }

  sendMessage(msg) {
    const nick = this.usr.user.nick;
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


