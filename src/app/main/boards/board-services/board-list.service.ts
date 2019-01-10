import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";

import { Board } from "../board-shared/board.model";

const STORAGE_KEY = "boards";

@Injectable()
export class BoardListService {
  constructor(private readonly ngf: NgForage) {
    this.ngf.name = "trello-clone";
    this.ngf.storeName = "boardCollection";
  }

  public saveBoard(board: Board) {
    this.ngf.setItem(String(board.id), board);
  }

  public getBoardKeys(): Promise<string[]> {
    return this.ngf.keys();
  }

  public getBoardItem(key) {
    return this.ngf.getItem(key);
  }
}
