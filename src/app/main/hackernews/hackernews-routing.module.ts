import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HackerNewsMainComponent } from "./hackernews-main/hackernews-main.component";
import { HackerNewsFeedComponent } from "./hackernews-feed/hackernews-feed.component";

const routes: Routes = [
  {
    path: "",
    component: HackerNewsMainComponent,
    children: [
      { path: "", redirectTo: "news", pathMatch: "full" },
      {
        path: "news",
        component: HackerNewsFeedComponent,
        data: { feedType: "news" }
      },
      {
        path: "newest",
        component: HackerNewsFeedComponent,
        data: { feedType: "newest" }
      },
      {
        path: "ask",
        component: HackerNewsFeedComponent,
        data: { feedType: "ask" }
      },
      {
        path: "show",
        component: HackerNewsFeedComponent,
        data: { feedType: "show" }
      },
      {
        path: "jobs",
        component: HackerNewsFeedComponent,
        data: { feedType: "jobs" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HackerNewsRoutingModule {}
