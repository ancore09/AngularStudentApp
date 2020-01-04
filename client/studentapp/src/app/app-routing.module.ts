import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { NewsComponent } from './news/news.component';
import { TableComponent } from './table/table.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: 'news', component: NewsComponent},
  {path: 'table', component: TableComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AuthComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
