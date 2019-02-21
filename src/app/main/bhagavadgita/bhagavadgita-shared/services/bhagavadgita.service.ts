import { Injectable } from "@angular/core";
import { ChapterAdapter, Chapter } from "../models/chapter.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const bhagavadGitaApiURL = environment.bhagavadGitaEndpoints.api;

@Injectable()
export class BhagavadGitaService {
  constructor(
    private http: HttpClient,
    private chapterAdapter: ChapterAdapter
  ) {}

  getChapters(): Observable<Chapter[]> {
    const url = bhagavadGitaApiURL + "chapters";
    return this.http
      .get(url)
      .pipe(
        map((data: any[]) => data.map(item => this.chapterAdapter.adapt(item)))
      );
  }
}
