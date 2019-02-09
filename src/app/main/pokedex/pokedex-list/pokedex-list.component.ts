import { Component, OnInit } from "@angular/core";
import { PokedexService } from "../pokedex-shared/services/pokedex-api.service";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../pokedex-shared/models/pokemon.model";
import { Results, FeedItem } from "../pokedex-shared/models/feeditem.model";

import { forkJoin } from "rxjs/observable/forkJoin";
import { environment } from "src/environments/environment";

const apiBaseUrl = environment.pokedexApiBaseUrl;

@Component({
  selector: "pokedex-list",
  providers: [PokedexService],
  templateUrl: "./pokedex-list.component.html",
  styleUrls: ["./pokedex-list.component.css"]
})
export class PokedexListComponent implements OnInit {
  title = "This is the Pokedex List Component";
  feedType: string;
  feedItem: FeedItem;
  pokemons: Pokemon[];

  isActive: boolean = false;
  selectedPokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService
  ) {}

  getPokemonData(results: Results[]) {
    let batch = results.map(result => {
      return this.pokedexService.getPokemon(result.url);
    });
    forkJoin(...batch).subscribe((responses: Pokemon[]) => {
      this.pokemons = responses;
    });
  }

  getFeedData(url: string) {
    window.scroll(0, 0); //TODO: Should find a better way
    this.pokedexService.getFeedData(url).subscribe(data => {
      this.feedItem = data;
      this.getPokemonData(data.results);
    });
  }

  showPokemonDetails(pokemon: Pokemon) {
    this.isActive = true;
    console.log(pokemon);
    this.selectedPokemon = pokemon;
  }

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    const url = apiBaseUrl + this.feedType;
    this.getFeedData(url);
  }
}
