import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'trello-clone',
    loadChildren: './main/boards/board.module#BoardModule'
  },
  {
    path: 'hackernews',
    loadChildren: './main/hackernews/hackernews.module#HackerNewsModule'
  },
  {
    path: 'pokedex',
    loadChildren: './main/pokedex/pokedex.module#PokedexModule'
  },
  {
    path: 'bhagavadgita',
    loadChildren: './main/bhagavadgita/bhagavadgita.module#BhagavadGitaModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
