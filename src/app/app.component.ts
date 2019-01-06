import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  appSelected = "trello";

  onNavigate(app: string) {
    this.appSelected = app;
  }
}
