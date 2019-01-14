import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";

import { Board } from "../models/board.model";
import { GlobalVariable } from "../../../../shared/constants/global";

@Injectable()
export class BoardListService {
  constructor(private readonly ngf: NgForage) {
    this.ngf.name = GlobalVariable.TRELLOCLONE_DB_NAME;
    this.ngf.storeName = GlobalVariable.TRELLOCLONE_DB_STORE_NAME;
  }

  public saveBoard(board: Board) {
    this.ngf.setItem(String(board.id), board);
  }

  public deleteBoard(boardId: number) {
    this.ngf.removeItem(String(boardId));
  }

  public getBoardKeys(): Promise<string[]> {
    return this.ngf.keys();
  }

  public getBoardItem(key) {
    return this.ngf.getItem(key);
  }
}
