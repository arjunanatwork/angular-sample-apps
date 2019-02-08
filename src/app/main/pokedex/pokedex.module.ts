import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";
import { PokedexRoutingModule } from "./pokedex-routing.module";
import { PokedexListComponent } from "./pokedex-list/pokedex-list.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, HttpClientModule, PokedexRoutingModule],
  declarations: [PokedexMainComponent, PokedexListComponent]
})
export class PokedexModule {}
