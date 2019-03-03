import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { TokenService } from "../bhagavadgita-shared/services/token.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "bhagavadgita-main",
  templateUrl: "./bhagavadgita-main.component.html",
  styleUrls: ["./bhagavadgita-main.component.css"]
})
export class BhagavadGitaMainComponent implements OnDestroy {
  title = "This is the Bhagavad Gita Main Component";

  routerEvent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {
    this.routerEvent = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e.url === "/bhagavadgita" && e instanceof NavigationEnd) {
        this.getTokenAndNavigate();
      }
    });
  }

  getTokenAndNavigate() {
    if (!this.tokenService.checkToken()) {
      this.tokenService.obtainAccessToken().subscribe((data: any) => {
        this.tokenService.saveToken(data.access_token);
        this.router.navigate(["chapters"], { relativeTo: this.route.parent });
      });
    } else {
      this.router.navigate(["chapters"], { relativeTo: this.route.parent });
    }
  }

  ngOnDestroy(): void {
    this.routerEvent.unsubscribe();
  }
}
