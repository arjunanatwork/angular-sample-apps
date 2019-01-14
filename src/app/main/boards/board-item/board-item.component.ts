import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { ToastrService } from "ngx-toastr";

import { Board } from "../board-shared/models/board.model";
import { List } from "../board-shared/models/list.model";

import { BoardItemService } from "../board-shared/services/board-item.service";
import { Card } from "../board-shared/models/card.model";

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
    private boardItemService: BoardItemService,
    private toastr: ToastrService
  ) {}

  getBoardInfo(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.boardItemService.getBoardInfo(id).then(value => {
      this.board = value;
    });
  }

  createList() {
    let list = new List(
      Math.floor(Math.random() * 1000) + 1,
      this.listName.nativeElement.value,
      [],
      this.board.id
    );
    this.board.list.push(list);
    this.boardItemService.saveBoard(this.board);
    this.toastr.success("List " + list.name + " has been created", "", {
      toastClass: "toast has-background-success	"
    });
  }

  createCard(value: string, listId: number) {
    console.log(value);
    let card = new Card(Math.floor(Math.random() * 1000) + 1, value, false);
    this.board.list.find(x => x.id == listId).cards.push(card);
    this.boardItemService.saveBoard(this.board);
    this.toastr.success("Card " + card.name + " has been created", "", {
      toastClass: "toast has-background-success	"
    });
  }

  cardAction(cardId: number, listId: number, isCompleted: boolean) {
    let cardIndex = this.getCardIndex(cardId, listId);
    this.board.list.find(x => x.id === listId).cards[
      cardIndex
    ].isCompleted = isCompleted;
    this.boardItemService.saveBoard(this.board);
    if (isCompleted) {
      this.toastr.info("Card has been marked as completed", "", {
        toastClass: "toast has-background-info"
      });
    }
  }

  deleteList(listId: number) {
    let listIndex = this.board.list.findIndex(i => i.id === listId);
    this.board.list.splice(listIndex, 1);
    this.boardItemService.saveBoard(this.board);
    this.toastr.info("List has been deleted", "", {
      toastClass: "toast has-background-info"
    });
  }

  deleteCard(cardId: number, listId: number) {
    let cardIndex = this.getCardIndex(cardId, listId);
    this.board.list.find(x => x.id === listId).cards.splice(cardIndex, 1);
    this.boardItemService.saveBoard(this.board);
    this.toastr.info("Card has been deleted", "", {
      toastClass: "toast has-background-info"
    });
  }

  drop(event: CdkDragDrop<string[]>, listId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.boardItemService.saveBoard(this.board);
  }

  private getCardIndex(cardId: number, listId: number) {
    return this.board.list
      .find(x => x.id === listId)
      .cards.findIndex(i => i.id === cardId);
  }

  ngOnInit(): void {
    this.getBoardInfo();
  }
}
