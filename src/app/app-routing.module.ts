import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'trello-clone',
        loadChildren: () =>
          import('./main/boards/board.module').then(m => m.BoardModule)
      },
      {
        path: 'hackernews',
        loadChildren: () =>
          import('./main/hackernews/hackernews.module').then(
            m => m.HackerNewsModule
          )
      },
      {
        path: 'pokedex',
        loadChildren: () =>
          import('./main/pokedex/pokedex.module').then(m => m.PokedexModule)
      },
      {
        path: 'bhagavadgita',
        loadChildren: () =>
          import('./main/bhagavadgita/bhagavadgita.module').then(
            m => m.BhagavadGitaModule
          )
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
