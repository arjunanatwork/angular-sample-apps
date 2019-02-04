import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";
import { PokedexRoutingModule } from "./pokedex-routing.module";

@NgModule({
  imports: [CommonModule, PokedexRoutingModule],
  declarations: [PokedexMainComponent]
})
export class PokedexModule {}
