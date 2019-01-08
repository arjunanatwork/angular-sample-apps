import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Board } from "../board-shared/board.model";
import { List } from "../board-shared/list.model";

import { BoardItemService } from "../board-services/board-item.service";

@Component({
  selector: "board-item",
  providers: [BoardItemService],
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.css"]
})
export class BoardItemComponent implements OnInit {
  showCreateList = false;
  board: Board;
  listItems: List[] = [];

  @ViewChild("listName") listName: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private boardItemService: BoardItemService
  ) {}

  getBoardInfo(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.board = this.boardItemService.getBoardInfo(id);
  }

  createList() {
    let list = new List(
      Math.floor(Math.random() * 1000) + 1,
      this.listName.nativeElement.value,
      [],
      this.board.id
    );
    this.listItems = this.listItems || [];
    this.listItems.push(list);
    this.boardItemService.saveList(list);
    console.log(this.listItems);
  }

  ngOnInit(): void {
    this.getBoardInfo();
  }
}
