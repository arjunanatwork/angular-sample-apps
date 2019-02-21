import { Component, OnInit } from "@angular/core";
import { BhagavadGitaService } from "../bhagavadgita-shared/services/bhagavadgita.service";
import { Chapter } from "../bhagavadgita-shared/models/chapter.model";
import { TokenService } from "../bhagavadgita-shared/services/token.service";
import { Observable } from "rxjs";
import { of } from "rxjs";

@Component({
  selector: "bhagavadgita-chapters",
  providers: [BhagavadGitaService],
  templateUrl: "./bhagavadgita-chapters.component.html",
  styleUrls: [
    "./bhagavadgita-chapters.component.css",
    "../bhagavadgita.component.css"
  ]
})
export class BhagavadGitaChaptersComponent implements OnInit {
  title = "This is the Bhagavad Gita Chapters Component";
  chapters: Observable<Chapter[]>;
  constructor(
    private bgService: BhagavadGitaService,
    private tokenService: TokenService
  ) {}

  getChapters() {
    this.bgService.getChapters().subscribe((data: Chapter[]) => {
      this.chapters = of(data);
    });
  }

  getChaptersWithNewToken() {
    this.tokenService.obtainAccessToken().subscribe(
      (data: any) => {
        this.tokenService.saveToken(data.access_token);
        this.getChapters();
      },
      err => console.error("No Token Obtained")
    );
  }

  ngOnInit() {
    //Check Token
    if (this.tokenService.checkToken) {
      this.getChapters();
    } else {
      this.getChaptersWithNewToken();
    }
  }
}
