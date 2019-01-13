import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HackerNewsRoutingModule } from "./hackernews-routing.module";

import { HackerNewsMainComponent } from "./hackernews-main/hackernews-main.component";
import { HackerNewsHeaderComponent } from "./hackernews-header/hackernews-header.component";

@NgModule({
  imports: [CommonModule, HackerNewsRoutingModule],
  declarations: [HackerNewsMainComponent, HackerNewsHeaderComponent]
})
export class HackerNewsModule {}
