import { Inject, Injectable } from "@angular/core";
import { SESSION_STORAGE, StorageService } from "angular-webstorage-service";

const STORAGE_KEY = "boards";
const ACTIVE_BOARD_KEY = "activeboard";

@Injectable()
export class BoardItemService {
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {}

  public getBoardInfo(id: number) {
    let boards = this.storage.get(STORAGE_KEY);
    let activeBoard = boards.find(board => board.id === id);

    let isActiveBoardPresent = this.storage.get(ACTIVE_BOARD_KEY);
    if (isActiveBoardPresent != undefined || isActiveBoardPresent != null) {
      this.storage.set(ACTIVE_BOARD_KEY, null);
    }

    this.storage.set(ACTIVE_BOARD_KEY, activeBoard);
    return activeBoard;
  }
}
