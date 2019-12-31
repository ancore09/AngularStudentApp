import { Component, OnInit } from '@angular/core';
import {ChatService, Msg} from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.chat.addMsg(msg.body);
      // msg.text = msg.text.replace('"', '');
      // msg.text = msg.text.replace('"', '');
      console.log(msg);
    });
  }

  sendMessage(msg, nick) {
    const mes = new Msg(nick, msg);
    this.chat.sendMsg(mes);
  }

}
