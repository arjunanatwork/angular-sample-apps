import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { HackerNewsRoutingModule } from "./hackernews-routing.module";

import { HackerNewsMainComponent } from "./hackernews-main/hackernews-main.component";
import { HackerNewsHeaderComponent } from "./hackernews-header/hackernews-header.component";
import { HackerNewsFeedComponent } from "./hackernews-feed/hackernews-feed.component";

@NgModule({
  imports: [CommonModule, HttpClientModule, HackerNewsRoutingModule],
  declarations: [
    HackerNewsMainComponent,
    HackerNewsHeaderComponent,
    HackerNewsFeedComponent
  ]
})
export class HackerNewsModule {}
