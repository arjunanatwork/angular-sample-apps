import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit } from "@angular/core";
import {Router} from "@angular/router";


import { Board } from "../shared/board.model";
import { BoardListService } from "../services/board-list.service"

@Component({
  selector: "board-list",
  providers: [BoardListService],
  templateUrl: "./board-list.component.html",
  styleUrls: ["./board-list.component.css"]
})
export class BoardListComponent implements OnInit {
  title = "Trello Clone";
  showCreateBoard = false;
  boardList : Board[] = [];

  @ViewChild("boardName") boardName: ElementRef;

  constructor(private router: Router, private boardListService: BoardListService) { }

  createBoard(){
    let board = new Board(Math.floor(Math.random() * 1000) + 1, this.boardName.nativeElement.value)
    this.boardList.push(board);
    this.boardListService.saveBoard(board);
    console.log(this.boardList)
  }

  onBoardSelect(board:Board) {
    this.router.navigate(['/trello-clone/board',board.id]);
  }

  ngOnInit() {
    this.boardList = this.boardListService.getBoards();
    console.log("Fetched Boards "+this.boardList.length);
  }

}
