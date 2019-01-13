import { List } from "../board-shared/list.model";

export class Board {
  constructor(public id: number, public name: string, public list: List[]) {}
}
