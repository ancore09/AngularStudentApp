import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  title: string;
  body: string;
  epilogue: string;
  constructor(public newserv: NewsService, private usr: UserService) { }

  ngOnInit() {
    this.newserv.getNews();
  }

  Add() {
    this.newserv.Add(this.title, this.body, this.epilogue);
  }
}
