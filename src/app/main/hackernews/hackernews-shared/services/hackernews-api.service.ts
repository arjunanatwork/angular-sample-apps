import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FeedItem, FeedItemAdapter } from "../models/feedItem.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

const apiBaseUrl = environment.hackerNewsApiBaseUrl;

@Injectable({
  providedIn: "root"
})
export class HackerNewsApiService {
  constructor(private http: HttpClient, private adapter: FeedItemAdapter) {}

  getFeedItems(feedType: string): Observable<FeedItem[]> {
    const url = apiBaseUrl + feedType;
    return this.http
      .get(url)
      .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
}
