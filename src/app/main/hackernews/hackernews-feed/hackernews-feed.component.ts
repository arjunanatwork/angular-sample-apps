import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "hackernews-feed",
  templateUrl: "./hackernews-feed.component.html",
  styleUrls: ["./hackernews-feed.component.css"]
})
export class HackerNewsFeedComponent implements OnInit {
  title = "This is the Feed Component";
  feedType: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    console.log(this.feedType);
  }
}
