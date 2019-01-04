import { Component, ViewChild, ElementRef } from "@angular/core";
import { Board } from "../shared/board.model";

@Component({
  selector: "board-list",
  templateUrl: "./board-list.component.html",
  styleUrls: ["./board-list.component.css"]
})
export class BoardListComponent {
  title = "Trello Clone";
  showCreateBoard = false;
  boardList : Board[] = [];

  @ViewChild("boardName") boardName: ElementRef;

  createBoard(){
    this.boardList.push(new Board(this.boardName.nativeElement.value));
    console.log(this.boardList)
  }
}
