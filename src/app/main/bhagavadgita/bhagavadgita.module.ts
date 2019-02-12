import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { BhagavadGitaRoutingModule } from "./bhagavadgita-routing.module";
import { BhagavadGitaMainComponent } from "./bhagavadgita-main/bhagavadgita-main.component";
import { BhagavadGitaChaptersComponent } from "./bhagavadgita-chapters/bhagavadgita-chapters.component";

@NgModule({
  imports: [CommonModule, HttpClientModule, BhagavadGitaRoutingModule],
  declarations: [BhagavadGitaMainComponent, BhagavadGitaChaptersComponent]
})
export class BhagavadGitaModule {}
