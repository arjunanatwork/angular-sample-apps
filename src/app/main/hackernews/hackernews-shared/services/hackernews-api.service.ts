import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedItem, FeedItemAdapter } from '../models/feeditem.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserAdapter } from '../models/user.model';
import { ItemAdapter } from '../models/item.model';

const apiBaseUrl = environment.hackerNewsApiBaseUrl;

@Injectable()
export class HackerNewsApiService {
  constructor(
    private http: HttpClient,
    private adapter: FeedItemAdapter,
    private userAdapter: UserAdapter,
    private itemAdapter: ItemAdapter
  ) {}

  getFeedItems(feedType: string, page: number): Observable<FeedItem[]> {
    const url = apiBaseUrl + feedType;
    return this.http
      .get(url, { params: new HttpParams().set('page', page.toString()) })
      .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }

  getFeedDetails(id: string, feedType: string): Observable<any> {
    const url = apiBaseUrl + feedType + '/' + id;
    return this.http
      .get(url)
      .pipe(
        map((data: any) =>
          feedType === 'user'
            ? this.userAdapter.adapt(data)
            : this.itemAdapter.adapt(data)
        )
      );
  }
}
