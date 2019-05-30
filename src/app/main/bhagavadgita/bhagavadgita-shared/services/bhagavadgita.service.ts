import { Injectable } from '@angular/core';
import { ChapterAdapter, Chapter } from '../models/chapter.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/shared/services/cache.service';
import { VerseAdapter, Verse } from '../models/verse.model';
import { TokenService } from './token.service';

const bhagavadGitaApiURL = environment.bhagavadGitaEndpoints.api;

@Injectable()
export class BhagavadGitaService {
  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private chapterAdapter: ChapterAdapter,
    private verseAdapter: VerseAdapter,
    private tokenService: TokenService
  ) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers = headers.set(
      'Authorization',
      'Bearer ' + this.tokenService.getToken()
    );
    return headers;
  }

  // Get All Chapters from API
  getChapters(): Observable<Chapter[]> {
    const url = bhagavadGitaApiURL + 'chapters';
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    let chaptersFromCache = this.checkCacheData(url);
    if (chaptersFromCache) {
      console.log('Data returned from Cache');
      return chaptersFromCache;
    }
    console.log('No Data returned from Cache, calling API');
    return this.http
      .get(url, { headers: headers })
      .pipe(
        map((data: any[]) => data.map(item => this.chapterAdapter.adapt(item)))
      );
  }

  getChapter(chapterNumber: number): Observable<Chapter> {
    const url = bhagavadGitaApiURL + 'chapters/' + chapterNumber;
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http
      .get(url, { headers: headers })
      .pipe(map((data: any) => this.chapterAdapter.adapt(data)));
  }

  getVersesForChapter(chapterNumber: number): Observable<Verse[]> {
    const url = bhagavadGitaApiURL + 'chapters/' + chapterNumber + '/verses';
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http
      .get(url, { headers: headers })
      .pipe(
        map((data: any[]) => data.map(item => this.verseAdapter.adapt(item)))
      );
  }

  getVerse(chapterNumber: number, verseNumber: string): Observable<Verse> {
    const url =
      bhagavadGitaApiURL +
      'chapters/' +
      chapterNumber +
      '/verses/' +
      verseNumber;
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http
      .get(url, { headers: headers })
      .pipe(map((data: any) => this.verseAdapter.adapt(data)));
  }

  checkCacheData(url: string): Observable<any> {
    return this.cacheService.getResponsefromCache(url);
  }
}
