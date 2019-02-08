import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class FeedItem {
  constructor(
    public count: number,
    public next: string,
    public previous: string,
    public results: Results[]
  ) {}
}

export class Results {
  constructor(public name: string, public url: string) {}
}

@Injectable({
  providedIn: "root"
})
export class FeedItemAdapter implements Adapter<FeedItem> {
  adapt(feeditem: any): FeedItem {
    let item = new FeedItem(
      feeditem.count,
      feeditem.next,
      feeditem.previous,
      feeditem.results.map(i => new Results(i.name, i.url))
    );
    return item;
  }
}
