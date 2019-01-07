import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Board } from "../board-shared/board.model";
import { BoardItemService } from "../board-services/board-item.service";

@Component({
  selector: "board-item",
  providers: [BoardItemService],
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.css"]
})
export class BoardItemComponent implements OnInit {
  board: Board;

  constructor(private route: ActivatedRoute,private boardItemService: BoardItemService) {}

  getBoardInfo(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    console.log(id);
    this.board = this.boardItemService.getBoardInfo(id);
  }

  ngOnInit(): void {
    this.getBoardInfo();
  }
}
