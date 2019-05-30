import { Injectable } from '@angular/core';
import { Adapter } from '../core/adapter';

export class Item {
  constructor(
    public id: number,
    public title: string,
    public points: number,
    public user: string,
    public time: number,
    public time_ago: string,
    public content: string,
    public deleted: boolean,
    public dead: boolean,
    public type: string,
    public url: string,
    public domain: string,
    public comments: Item[],
    public level: number,
    public comments_count: number,
    public expanded: boolean = true
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ItemAdapter implements Adapter<Item> {
  adapt(feeditem: any): Item {
    const item = new Item(
      feeditem.id,
      feeditem.title,
      feeditem.points,
      feeditem.user,
      feeditem.time,
      feeditem.time_ago,
      feeditem.content,
      feeditem.deleted,
      feeditem.dead,
      feeditem.type,
      feeditem.url,
      feeditem.domain,
      feeditem.comments.map(i => this.adapt(i)),
      feeditem.level,
      feeditem.comments_count,
      true
    );
    return item;
  }
}
