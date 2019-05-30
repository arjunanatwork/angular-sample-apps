import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardListComponent } from './board-list/board-list.component';
import { BoardMainComponent } from './board-main/board-main.component';
import { BoardItemComponent } from './board-item/board-item.component';

const routes: Routes = [
  {
    path: '',
    component: BoardMainComponent,
    children: [
      { path: '', component: BoardListComponent },
      { path: 'board/:id', component: BoardItemComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule {}
