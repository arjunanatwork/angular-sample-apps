import { Component, OnInit } from "@angular/core";
import { TokenService } from "../bhagavadgita-shared/services/token.service";

@Component({
  selector: "bhagavadgita-main",
  providers: [TokenService],
  templateUrl: "./bhagavadgita-main.component.html",
  styleUrls: ["./bhagavadgita-main.component.scss"]
})
export class BhagavadGitaMainComponent implements OnInit {
  title = "This is the Bhagavad Gita Main Component";

  constructor(private tokenService: TokenService) {}
  ngOnInit() {
    //Obtain the token
    this.tokenService.obtainAccessToken();
  }
}
