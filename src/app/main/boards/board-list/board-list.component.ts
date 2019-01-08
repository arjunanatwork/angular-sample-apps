import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Board } from "../board-shared/board.model";
import { BoardListService } from "../board-services/board-list.service";

@Component({
  selector: "board-list",
  providers: [BoardListService],
  templateUrl: "./board-list.component.html",
  styleUrls: ["./board-list.component.css"]
})
export class BoardListComponent implements OnInit {
  title = "Trello Clone";
  showCreateBoard = false;
  boardList: Board[] = [];

  @ViewChild("boardName") boardName: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardListService: BoardListService
  ) {}

  createBoard() {
    let board = new Board(
      Math.floor(Math.random() * 1000) + 1,
      this.boardName.nativeElement.value,
      []
    );
    this.boardList = this.boardList || [];
    this.boardList.push(board);
    this.boardListService.saveBoard(board);
    console.log(this.boardList);
  }

  onBoardSelect(board: Board) {
    this.router.navigate(["board", board.id], { relativeTo: this.route });
  }

  ngOnInit() {
    this.boardList = this.boardListService.getBoards();
  }
}
