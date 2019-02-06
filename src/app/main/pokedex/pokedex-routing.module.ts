import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";
import { PokedexListComponent } from "./pokedex-list/pokedex-list.component";

const routes: Routes = [
  {
    path: "",
    component: PokedexMainComponent,
    children: [{ path: "", component: PokedexListComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule {}
