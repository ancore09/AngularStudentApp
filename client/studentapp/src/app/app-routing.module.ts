import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { NewsComponent } from './news/news.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'news', component: NewsComponent},
  {path: 'table', component: TableComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
