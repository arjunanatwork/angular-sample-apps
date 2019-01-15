import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HackerNewsApiService } from "../hackernews-shared/services/hackernews-api.service";
import { FeedItem } from "../hackernews-shared/models/feedItem.model";

@Component({
  selector: "hackernews-feed",
  providers: [HackerNewsApiService],
  templateUrl: "./hackernews-feed.component.html",
  styleUrls: ["./hackernews-feed.component.css"]
})
export class HackerNewsFeedComponent implements OnInit {
  title = "This is the Feed Component";
  feedType: string;
  feedItems: FeedItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private hackerNewsApi: HackerNewsApiService
  ) {}

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    this.hackerNewsApi
      .getFeedItems(this.feedType)
      .subscribe((data: FeedItem[]) => (this.feedItems = data));
  }
}
