import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";

import { BhagavadGitaRoutingModule } from "./bhagavadgita-routing.module";
import { BhagavadGitaMainComponent } from "./bhagavadgita-main/bhagavadgita-main.component";
import { BhagavadGitaChaptersComponent } from "./bhagavadgita-chapters/bhagavadgita-chapters.component";
import { TokenInterceptor } from "./bhagavadgita-shared/core/token.interceptor";
import { TokenService } from "./bhagavadgita-shared/services/token.service";
import { BhagavadGitaChapterComponent } from "./bhagavadgita-chapter/bhagavadgita-chapter.component";
import { BhagavadGitaService } from "./bhagavadgita-shared/services/bhagavadgita.service";
import { BhagavadGitaVerseComponent } from "./bhagavadgita-verse/bhagavadgita-verse.component";
import { LoadingSpinnerComponent } from "src/app/shared/ui/loading-spinner/loading-spinner.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BhagavadGitaRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    BhagavadGitaMainComponent,
    BhagavadGitaChaptersComponent,
    BhagavadGitaChapterComponent,
    BhagavadGitaVerseComponent,
    LoadingSpinnerComponent
  ],
  providers: [
    TokenService,
    BhagavadGitaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CookieService
  ]
})
export class BhagavadGitaModule {}
