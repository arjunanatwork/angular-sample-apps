import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MainComponent } from "./main/main.component";

import { BoardListComponent } from "./main/boards/board-list/board-list.component";
import { BoardMainComponent } from "./main/boards/board-main/board-main.component";

import { HackerNewsMainComponent } from "./main/hackernews/hackernews-main/hackernews-main.component";

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'trello-clone', component: BoardMainComponent },
  { path: 'hackernews', component: HackerNewsMainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    BoardMainComponent,
    BoardListComponent,
    HackerNewsMainComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
