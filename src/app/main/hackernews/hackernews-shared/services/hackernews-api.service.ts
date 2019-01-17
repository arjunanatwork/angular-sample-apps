import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FeedItem, FeedItemAdapter } from "../models/feedItem.model";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User, UserAdapter } from "../models/user.model";

const apiBaseUrl = environment.hackerNewsApiBaseUrl;

@Injectable({
  providedIn: "root"
})
export class HackerNewsApiService {
  constructor(
    private http: HttpClient,
    private adapter: FeedItemAdapter,
    private userAdapter: UserAdapter
  ) {}

  getFeedItems(feedType: string, page: number): Observable<FeedItem[]> {
    const url = apiBaseUrl + feedType;
    return this.http
      .get(url, { params: new HttpParams().set("page", page.toString()) })
      .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }

  getUserDetails(id: string, feedType: string): Observable<User> {
    const url = apiBaseUrl + feedType + "/" + id;
    return this.http
      .get(url)
      .pipe(map((data: any) => this.userAdapter.adapt(data)));
  }
}
