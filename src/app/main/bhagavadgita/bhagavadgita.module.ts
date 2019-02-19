import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BhagavadGitaRoutingModule } from "./bhagavadgita-routing.module";
import { BhagavadGitaMainComponent } from "./bhagavadgita-main/bhagavadgita-main.component";
import { BhagavadGitaChaptersComponent } from "./bhagavadgita-chapters/bhagavadgita-chapters.component";
import { TokenInterceptor } from "./bhagavadgita-shared/core/token.interceptor";
import { TokenService } from "./bhagavadgita-shared/services/token.service";

@NgModule({
  imports: [CommonModule, HttpClientModule, BhagavadGitaRoutingModule],
  declarations: [BhagavadGitaMainComponent, BhagavadGitaChaptersComponent],
  providers: [
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CookieService
  ]
})
export class BhagavadGitaModule {}
