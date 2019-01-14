import { List } from "./list.model";

export class Board {
  constructor(public id: number, public name: string, public list: List[]) {}
}
