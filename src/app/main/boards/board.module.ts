import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';

import { NgForageConfig, Driver } from 'ngforage';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardListComponent } from './board-list/board-list.component';
import { BoardMainComponent } from './board-main/board-main.component';
import { BoardItemComponent } from './board-item/board-item.component';

@NgModule({
  imports: [CommonModule, BoardRoutingModule, DragDropModule],
  declarations: [BoardListComponent, BoardMainComponent, BoardItemComponent]
})
export class BoardModule {
  public constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: 'Angular-Sample-Apps',
      driver: [
        // defaults to indexedDB -> webSQL -> localStorage
        Driver.INDEXED_DB,
        Driver.LOCAL_STORAGE
      ]
    });
  }
}
