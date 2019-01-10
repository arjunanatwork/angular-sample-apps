import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";

import { List } from "../board-shared/list.model";
import { Board } from "../board-shared/board.model";

@Injectable()
export class BoardItemService {
  constructor(private readonly ngf: NgForage) {
    this.ngf.name = "trello-clone";
    this.ngf.storeName = "boardCollection";
  }

  public getBoardInfo(id: string): Promise<Board> {
    return this.ngf.getItem(id);
  }

  public saveBoard(board: Board) {
    this.ngf.setItem(String(board.id), board);
  }
}
