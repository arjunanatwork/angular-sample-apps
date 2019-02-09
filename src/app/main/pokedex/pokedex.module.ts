import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";
import { PokedexRoutingModule } from "./pokedex-routing.module";
import { PokedexListComponent } from "./pokedex-list/pokedex-list.component";
import { HttpClientModule } from "@angular/common/http";
import { PokedexListItemComponent } from "./pokedex-list/pokedex-list-item/pokedex-list-item.component";

@NgModule({
  imports: [CommonModule, HttpClientModule, PokedexRoutingModule],
  declarations: [
    PokedexMainComponent,
    PokedexListComponent,
    PokedexListItemComponent
  ]
})
export class PokedexModule {}
