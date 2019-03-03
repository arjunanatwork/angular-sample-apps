import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Verse {
  constructor(
    public meaning: string,
    public text: string,
    public transliteration: string,
    public verse_number: string,
    public word_meanings: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class VerseAdapter implements Adapter<Verse> {
  adapt(item: any): Verse {
    let chapter = new Verse(
      item.meaning,
      item.text,
      item.transliteration,
      item.verse_number,
      item.word_meanings
    );
    return chapter;
  }
}
