import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";

import { Board } from "../board-shared/board.model";

import { GlobalVariable } from "../../../shared/constants/global";

@Injectable()
export class BoardItemService {
  constructor(private readonly ngf: NgForage) {
    this.ngf.name = GlobalVariable.TRELLOCLONE_DB_NAME;
    this.ngf.storeName = GlobalVariable.TRELLOCLONE_DB_STORE_NAME;
  }

  public getBoardInfo(id: string): Promise<Board> {
    return this.ngf.getItem(id);
  }

  public saveBoard(board: Board) {
    this.ngf.setItem(String(board.id), board);
  }
}
