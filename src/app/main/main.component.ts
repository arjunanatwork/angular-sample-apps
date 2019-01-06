import { Component, Input } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent {
  @Input() selectedApp: string;
  title = "This is the Main Component";
}
