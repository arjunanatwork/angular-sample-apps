import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "hackernews-item",
  templateUrl: "./hackernews-item.component.html",
  styleUrls: ["./hackernews-item.component.css"]
})
export class HackerNewsItemComponent implements OnInit {
  title = "This is the Item Component";

  constructor(private route: ActivatedRoute) {}

  getItemInfo() {
    const id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getItemInfo();
  }
}
