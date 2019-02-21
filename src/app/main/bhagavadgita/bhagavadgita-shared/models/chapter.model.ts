import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Chapter {
  constructor(
    public chapter_number: number,
    public chapter_summary: string,
    public name: string,
    public name_meaning: string,
    public name_translation: string,
    public name_transliterated: string,
    public verses_count: number
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class ChapterAdapter implements Adapter<Chapter> {
  adapt(item: any): Chapter {
    let chapter = new Chapter(
      item.chapter_number,
      item.chapter_summary,
      item.name,
      item.name_meaning,
      item.name_translation,
      item.name_transliterated,
      item.verses_count
    );
    return chapter;
  }
}
