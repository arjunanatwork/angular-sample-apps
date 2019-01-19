import { Component, Input } from "@angular/core";
import { Item } from "../../hackernews-shared/models/item.model";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: "hackernews-item-comments",
  templateUrl: "./hackernews-item-comments.component.html",
  styleUrls: ["./hackernews-item-comments.component.css"]
})
export class HackerNewsItemCommentsComponent {
  title = "This is the Item Comments Component";
  @Input() itemComments: Item[];
}
