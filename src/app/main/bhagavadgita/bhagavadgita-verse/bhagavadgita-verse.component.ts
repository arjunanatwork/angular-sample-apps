import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BhagavadGitaService } from "../bhagavadgita-shared/services/bhagavadgita.service";
import { Verse } from "../bhagavadgita-shared/models/verse.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "bhagavadgita-verse",
  templateUrl: "./bhagavadgita-verse.component.html",
  styleUrls: [
    "./bhagavadgita-verse.component.css",
    "../bhagavadgita.component.css"
  ]
})
export class BhagavadGitaVerseComponent implements OnInit {
  title = "This is the BhagavadGita Verse Component";
  chapterNumber: number;
  verseNumber: number;
  totalVerseCount: number[];

  verseDetails: Verse;
  state$: Observable<object>;

  showSpinner: boolean = true;
  hideLeftIcon: boolean = false;
  hideRightIcon: boolean = false;

  constructor(
    private bgService: BhagavadGitaService,
    private route: ActivatedRoute
  ) {}

  getVerseDetails(chapNum: number, verseNum: number) {
    let verseNumber = verseNum.toString();
    this.bgService.getVerse(chapNum, verseNumber).subscribe(data => {
      this.showSpinner = false;
      this.hideLeftIcon = false;
      this.hideRightIcon = false;

      this.verseNumber = Number(data.verse_number);
      let index = this.totalVerseCount.indexOf(Number(this.verseNumber));
      if (index == 0) {
        this.hideLeftIcon = true;
      } else if (index == this.totalVerseCount.length - 1) {
        this.hideRightIcon = true;
      }
      this.verseDetails = data;
    });
  }

  ngOnInit() {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe((data: any) => {
      this.chapterNumber = Number(data.chapterNumber);
      this.verseNumber = Number(data.verseNumber);
      this.totalVerseCount = Array.from(
        Array(Number(data.totalVerseCount)),
        (_, x) => x + 1
      );
      this.getVerseDetails(this.chapterNumber, this.verseNumber);
    });
  }
}
