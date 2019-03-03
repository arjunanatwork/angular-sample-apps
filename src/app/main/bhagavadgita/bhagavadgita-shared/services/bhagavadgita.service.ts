import { Injectable } from "@angular/core";
import { ChapterAdapter, Chapter } from "../models/chapter.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CacheService } from "src/app/shared/services/cache.service";
import { VerseAdapter, Verse } from "../models/verse.model";

const bhagavadGitaApiURL = environment.bhagavadGitaEndpoints.api;

@Injectable()
export class BhagavadGitaService {
  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private chapterAdapter: ChapterAdapter,
    private verseAdapter: VerseAdapter
  ) {}

  //Get All Chapters from API
  getChapters(): Observable<Chapter[]> {
    const url = bhagavadGitaApiURL + "chapters";
    let chaptersFromCache = this.checkCacheData(url);
    if (chaptersFromCache) {
      console.log("Data returned from Cache");
      return chaptersFromCache;
    }
    console.log("No Data returned from Cache, calling API");
    return this.http
      .get(url)
      .pipe(
        map((data: any[]) => data.map(item => this.chapterAdapter.adapt(item)))
      );
  }

  getChapter(chapterNumber: number): Observable<Chapter> {
    const url = bhagavadGitaApiURL + "chapters/" + chapterNumber;
    return this.http
      .get(url)
      .pipe(map((data: any) => this.chapterAdapter.adapt(data)));
  }

  getVersesForChapter(chapterNumber: number): Observable<Verse[]> {
    const url = bhagavadGitaApiURL + "chapters/" + chapterNumber + "/verses";
    return this.http
      .get(url)
      .pipe(
        map((data: any[]) => data.map(item => this.verseAdapter.adapt(item)))
      );
  }

  getVerse(chapterNumber: number, verseNumber: string): Observable<Verse> {
    const url =
      bhagavadGitaApiURL +
      "chapters/" +
      chapterNumber +
      "/verses/" +
      verseNumber;
    return this.http
      .get(url)
      .pipe(map((data: any) => this.verseAdapter.adapt(data)));
  }

  checkCacheData(url: string): Observable<any> {
    return this.cacheService.getResponsefromCache(url);
  }
}
