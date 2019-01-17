import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  currentPage: number = 1;
  listStartNo: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hackerNewsApi: HackerNewsApiService
  ) {}

  getFeedItems(feedType: string, currentPage: number) {
    window.scroll(0, 0); //TODO: Should find a better way
    this.hackerNewsApi
      .getFeedItems(feedType, currentPage)
      .subscribe((data: FeedItem[]) => (this.feedItems = data));
  }

  navigateToUserInfo(id: string) {
    this.router.navigate(["user", id], { relativeTo: this.route.parent });
  }

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    this.getFeedItems(this.feedType, this.currentPage);
  }
}
