import { Injectable } from '@angular/core';
import { Adapter } from '../core/adapter';

export class FeedItem {
  constructor(
    public id: number,
    public title: string,
    public points: number,
    public user: string,
    public time: number,
    public time_ago: string,
    public comments_count: number,
    public type: string,
    public url: string,
    public domain: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class FeedItemAdapter implements Adapter<FeedItem> {
  adapt(item: any): FeedItem {
    const feedItem = new FeedItem(
      item.id,
      item.title,
      item.points,
      item.user,
      item.time,
      item.time_ago,
      item.comments_count,
      item.type,
      item.url,
      item.domain
    );
    return feedItem;
  }
}
