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
  verseNumber: string;
  verseDetails: Verse;
  state$: Observable<object>;
  showSpinner: boolean = true;
  constructor(
    private bgService: BhagavadGitaService,
    private route: ActivatedRoute
  ) {}

  getVerseDetails() {
    this.bgService
      .getVerse(this.chapterNumber, this.verseNumber)
      .subscribe(data => {
        this.showSpinner = false;
        this.verseDetails = data;
      });
  }

  ngOnInit() {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe((data: any) => {
      this.chapterNumber = Number(data.chapterNumber);
      this.verseNumber = data.verseNumber;
      this.getVerseDetails();
    });
  }
}
