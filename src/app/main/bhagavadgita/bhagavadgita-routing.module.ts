import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BhagavadGitaMainComponent } from "./bhagavadgita-main/bhagavadgita-main.component";
import { BhagavadGitaChaptersComponent } from "./bhagavadgita-chapters/bhagavadgita-chapters.component";

const routes: Routes = [
  {
    path: "",
    component: BhagavadGitaMainComponent,
    children: [{ path: "", component: BhagavadGitaChaptersComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BhagavadGitaRoutingModule {}
