import { Component, OnInit } from "@angular/core";
import { PokedexService } from "../pokedex-shared/services/pokedex-api.service";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../pokedex-shared/models/pokemon.model";
import { Results } from "../pokedex-shared/models/feeditem.model";

import { from, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: "pokedex-list",
  providers: [PokedexService],
  templateUrl: "./pokedex-list.component.html",
  styleUrls: ["./pokedex-list.component.css"]
})
export class PokedexListComponent implements OnInit {
  title = "This is the Pokedex List Component";
  feedType: string;
  pokemons: Pokemon[];

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

  ngOnInit() {
    this.feedType = this.route.snapshot.data["feedType"];
    this.pokedexService.getFeedTypeResults(this.feedType).subscribe(data => {
      this.getPokemonData(data.results);
    });
  }
}
