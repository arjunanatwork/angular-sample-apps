import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HackerNewsApiService } from "../hackernews-shared/services/hackernews-api.service";
import { User } from "../hackernews-shared/models/user.model";

@Component({
  selector: "hackernews-user",
  providers: [HackerNewsApiService],
  templateUrl: "./hackernews-user.component.html",
  styleUrls: ["./hackernews-user.component.css"]
})
export class HackerNewsUserComponent implements OnInit {
  title = "This is the User Component";
  feedType: string;
  userInfo: User;

  constructor(
    private route: ActivatedRoute,
    private hackerNewsApi: HackerNewsApiService
  ) {}

  getUserInfo() {
    const id = this.route.snapshot.paramMap.get("id");
    this.hackerNewsApi
      .getFeedDetails(id, this.feedType)
      .subscribe((data: User) => (this.userInfo = data));
  }

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    this.getUserInfo();
  }
}
