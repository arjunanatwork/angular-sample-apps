import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";
import { PokedexService } from "../pokedex-shared/services/pokedex-api.service";
import { FeedItem } from "../pokedex-shared/models/feeditem.model";

const apiBaseUrl = environment.pokedexApiBaseUrl;

@Component({
  selector: "pokedex-header",
  providers: [PokedexService],
  templateUrl: "./pokedex-header.component.html",
  styleUrls: ["./pokedex-header.component.css"]
})
export class PokedexHeaderComponent implements OnInit {
  title = "This is the Pokedex Header Component";
  feedItem: FeedItem;
  isActive: boolean = false;
  typeName: string;

  @Output() typeSelected = new EventEmitter<string>();

  constructor(private pokedexService: PokedexService) {}

  filterByType(type: string, name: string) {
    this.typeName = name;
    this.typeSelected.emit(type);
  }

  getFeedData(url: string) {
    this.pokedexService.getFeedData(url).subscribe(data => {
      this.feedItem = data;
    });
  }

  ngOnInit() {
    const typleUrl = apiBaseUrl + "type";
    this.getFeedData(typleUrl);
  }
}
