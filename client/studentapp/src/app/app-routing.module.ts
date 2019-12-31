import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'news', component: NewsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
