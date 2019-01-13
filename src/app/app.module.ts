import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgForageConfig, Driver } from "ngforage";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MainComponent } from "./main/main.component";

import { BoardListComponent } from "./main/boards/board-list/board-list.component";
import { BoardMainComponent } from "./main/boards/board-main/board-main.component";
import { BoardItemComponent } from "./main/boards/board-item/board-item.component";

import { HackerNewsMainComponent } from "./main/hackernews/hackernews-main/hackernews-main.component";
import { HackerNewsHeaderComponent } from "./main/hackernews/hackernews-header/hackernews-header.component";

const routes: Routes = [
  { path: "", component: MainComponent, pathMatch: "full" },
  {
    path: "trello-clone",
    component: BoardMainComponent,
    children: [
      { path: "", component: BoardListComponent },
      { path: "board/:id", component: BoardItemComponent }
    ]
  },
  { path: "hackernews", component: HackerNewsMainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    BoardMainComponent,
    BoardListComponent,
    BoardItemComponent,
    HackerNewsMainComponent,
    HackerNewsHeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-bottom-center",
      preventDuplicates: true
    }),
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: "Angular-Sample-Apps",
      driver: [
        // defaults to indexedDB -> webSQL -> localStorage
        Driver.INDEXED_DB,
        Driver.LOCAL_STORAGE
      ]
    });
  }
}
