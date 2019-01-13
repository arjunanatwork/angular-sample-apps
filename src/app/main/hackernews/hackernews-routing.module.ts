import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HackerNewsMainComponent } from "./hackernews-main/hackernews-main.component";
import { HackerNewsHeaderComponent } from "./hackernews-header/hackernews-header.component";

const routes: Routes = [
  {
    path: "",
    component: HackerNewsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HackerNewsRoutingModule {}
