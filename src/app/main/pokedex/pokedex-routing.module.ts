import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";

const routes: Routes = [
  {
    path: "",
    component: PokedexMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule {}
