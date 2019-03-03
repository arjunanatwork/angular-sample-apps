import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { BhagavadGitaService } from "../bhagavadgita-shared/services/bhagavadgita.service";
import { Chapter } from "../bhagavadgita-shared/models/chapter.model";
import { Verse } from "../bhagavadgita-shared/models/verse.model";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { PaginationInstance } from "ngx-pagination";

@Component({
  selector: "bhagavadgita-chapter",
  templateUrl: "./bhagavadgita-chapter.component.html",
  styleUrls: [
    "./bhagavadgita-chapter.component.css",
    "../bhagavadgita.component.css"
  ]
})
export class BhagavadGitaChapterComponent implements OnInit {
  title = "This is the BhagavadGita Chapter Component";
  currentChapterNumber: number;
  chapterDetails: Chapter;
  totalVerseCount: number;
  verses: Observable<Verse[]>;
  p: number = 1;

  showChapterSpinner: boolean = true;
  showVerseSpinner: boolean = true;

  constructor(
    private bgService: BhagavadGitaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //Get Chapter Details and All Verses of the Chapter
  loadDetails() {
    this.currentChapterNumber = Number(this.route.snapshot.paramMap.get("id"));
    //Get Chapter Details
    this.getChapterInfo(this.currentChapterNumber);
    //Get Verses for a chapter
    this.getChapterVerses(this.currentChapterNumber);
  }

  getChapterInfo(chapterNumber: number) {
    this.bgService.getChapter(chapterNumber).subscribe((data: Chapter) => {
      this.showChapterSpinner = false;
      this.chapterDetails = data;
      this.totalVerseCount = data.verses_count;
    });
  }

  getChapterVerses(chapterNumber: number) {
    this.bgService
      .getVersesForChapter(chapterNumber)
      .subscribe((data: Verse[]) => {
        this.showVerseSpinner = false;
        this.verses = of(data);
      });
  }

  navigateToVerse(verseNumber: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        chapterNumber: this.currentChapterNumber.toString(),
        verseNumber: verseNumber,
        totalVerseCount: this.totalVerseCount
      },
      relativeTo: this.route.parent
    };
    this.router.navigate(
      ["chapters", this.currentChapterNumber, "verse", verseNumber],
      navigationExtras
    );
  }

  ngOnInit() {
    this.loadDetails();
  }
}
