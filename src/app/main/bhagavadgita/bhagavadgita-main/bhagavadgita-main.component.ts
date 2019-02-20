import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenService } from "../bhagavadgita-shared/services/token.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "bhagavadgita-main",
  templateUrl: "./bhagavadgita-main.component.html",
  styleUrls: ["./bhagavadgita-main.component.scss"]
})
export class BhagavadGitaMainComponent implements OnInit {
  title = "This is the Bhagavad Gita Main Component";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    //Obtain the token
    if (environment.production) {
      //TODO: Remove when project completed fully
      this.tokenService.obtainAccessToken().subscribe(
        (data: any) => {
          this.tokenService.saveToken(data.access_token);
          this.router.navigate(["chapters"], { relativeTo: this.route.parent });
        },
        err => console.error("No Token Obtained")
      );
    } else {
      this.tokenService.saveToken("vBIHxnNPp0tSSCLGX8nB93Oi5WMhIa");
      this.router.navigate(["chapters"], { relativeTo: this.route.parent });
    }
  }
}
