import { Component, OnInit } from '@angular/core';
import { BhagavadGitaService } from '../bhagavadgita-shared/services/bhagavadgita.service';
import { Chapter } from '../bhagavadgita-shared/models/chapter.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../bhagavadgita-shared/services/token.service';

@Component({
  selector: 'bhagavadgita-chapters',
  templateUrl: './bhagavadgita-chapters.component.html',
  styleUrls: [
    './bhagavadgita-chapters.component.css',
    '../bhagavadgita.component.css'
  ]
})
export class BhagavadGitaChaptersComponent implements OnInit {
  title = 'This is the Bhagavad Gita Chapters Component';
  chapters: Observable<Chapter[]>;
  showSpinner = true;
  isActive = false;
  constructor(
    private bgService: BhagavadGitaService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  // Get Chapters
  getChapters() {
    this.bgService.getChapters().subscribe(
      (data: Chapter[]) => {
        this.showSpinner = false;
        this.chapters = of(data);
      },
      error => {
        if (error.status === 401) {
          this.tokenService.obtainAccessToken().subscribe((data: any) => {
            this.tokenService.deleteToken();
            this.tokenService.saveToken(data.access_token);
            this.getChapters();
          });
        }
      }
    );
  }

  // Navigate To Chapter
  navigateToChapter(chapterNumber: number) {
    this.router.navigate(['chapters', chapterNumber], {
      relativeTo: this.route.parent
    });
  }

  ngOnInit() {
    // Check Token
    this.getChapters();
  }
}
