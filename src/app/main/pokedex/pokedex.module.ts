import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GoTopButtonModule } from "ng2-go-top-button";

import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";
import { PokedexRoutingModule } from "./pokedex-routing.module";
import { PokedexListComponent } from "./pokedex-list/pokedex-list.component";
import { HttpClientModule } from "@angular/common/http";
import { PokedexListItemComponent } from "./pokedex-list/pokedex-list-item/pokedex-list-item.component";
import { PokedexHeaderComponent } from "./pokedex-header/pokedex-header.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PokedexRoutingModule,
    GoTopButtonModule
  ],
  declarations: [
    PokedexHeaderComponent,
    PokedexMainComponent,
    PokedexListComponent,
    PokedexListItemComponent
  ]
})
export class PokedexModule {}
