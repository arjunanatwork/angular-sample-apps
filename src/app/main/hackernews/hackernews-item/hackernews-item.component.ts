import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HackerNewsApiService } from "../hackernews-shared/services/hackernews-api.service";
import { Item } from "../hackernews-shared/models/item.model";

@Component({
  selector: "hackernews-item",
  providers: [HackerNewsApiService],
  templateUrl: "./hackernews-item.component.html",
  styleUrls: ["./hackernews-item.component.css"]
})
export class HackerNewsItemComponent implements OnInit {
  title = "This is the Item Component";
  feedType: string;

  constructor(
    private route: ActivatedRoute,
    private hackerNewsApi: HackerNewsApiService
  ) {}

  getItemInfo() {
    const id = this.route.snapshot.paramMap.get("id");
    this.hackerNewsApi
      .getFeedDetails(id, this.feedType)
      .subscribe((data: Item) => console.log(data));
  }

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    this.getItemInfo();
  }
}
