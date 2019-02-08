import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { PokemonAdapter, Pokemon } from "../models/pokemon.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { FeedItem, FeedItemAdapter } from "../models/feeditem.model";

const apiBaseUrl = environment.pokedexApiBaseUrl;

@Injectable({
  providedIn: "root"
})
export class PokedexService {
  constructor(
    private http: HttpClient,
    private pokemonAdapter: PokemonAdapter,
    private feedTypeAdapter: FeedItemAdapter
  ) {}

  getPokemon(pokemonUrl: string): Observable<Pokemon> {
    const url = pokemonUrl;
    return this.http.get(url).pipe(
      map(data => {
        return this.pokemonAdapter.adapt(data);
      })
    );
  }

  getFeedTypeResults(feedType: string): Observable<FeedItem> {
    const url = apiBaseUrl + feedType;
    return this.http.get(url).pipe(
      map(data => {
        return this.feedTypeAdapter.adapt(data);
      })
    );
  }
}
