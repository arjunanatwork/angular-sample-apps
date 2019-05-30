import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BhagavadGitaMainComponent } from './bhagavadgita-main/bhagavadgita-main.component';
import { BhagavadGitaChaptersComponent } from './bhagavadgita-chapters/bhagavadgita-chapters.component';
import { BhagavadGitaChapterComponent } from './bhagavadgita-chapter/bhagavadgita-chapter.component';
import { BhagavadGitaVerseComponent } from './bhagavadgita-verse/bhagavadgita-verse.component';

const routes: Routes = [
  {
    path: '',
    component: BhagavadGitaMainComponent,
    children: [
      { path: 'chapters', component: BhagavadGitaChaptersComponent },
      { path: 'chapters/:id', component: BhagavadGitaChapterComponent },
      { path: 'chapters/:id/verse/:id', component: BhagavadGitaVerseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BhagavadGitaRoutingModule {}
