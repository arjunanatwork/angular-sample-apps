import { Inject, Injectable } from "@angular/core";
import { SESSION_STORAGE, StorageService } from "angular-webstorage-service";

import { Board } from "../board-shared/board.model";

const STORAGE_KEY = "boards";

@Injectable()
export class BoardListService {
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {}

  public saveBoard(board: Board) {
    //get array of tasks from local storage
    const currentBoardList = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    currentBoardList.push(board);
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentBoardList);

    console.log(this.storage.get(STORAGE_KEY) || "LocaL storage is empty");
  }

  public getBoards() {
    return this.storage.get(STORAGE_KEY);
  }
}
