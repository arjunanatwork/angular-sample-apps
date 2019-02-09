import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PokemonAdapter, Pokemon } from "../models/pokemon.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { FeedItem, FeedItemAdapter } from "../models/feeditem.model";
import { CacheService } from "src/app/shared/services/cache.service";
import { TypeFeedAdapter, TypeFeed } from "../models/type.model";

@Injectable()
export class PokedexService {
  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private pokemonAdapter: PokemonAdapter,
    private feedItemAdapter: FeedItemAdapter,
    private typeFeedAdapter: TypeFeedAdapter
  ) {}

  getPokemon(pokemonUrl: string): Observable<Pokemon> {
    let pokemonsFromCache = this.cacheService.getResponsefromCache(pokemonUrl);
    if (pokemonsFromCache) {
      console.log("Data returned from Cache");
      return pokemonsFromCache;
    }
    console.log("No Data returned from Cache, calling API");
    const url = pokemonUrl;
    return this.http.get(url).pipe(
      map(data => {
        let pokemonData = this.pokemonAdapter.adapt(data);
        this.cacheService.setDataToCache(pokemonUrl, pokemonData);
        return pokemonData;
      })
    );
  }

  getTypeFeed(typeUrl: string): Observable<TypeFeed> {
    const url = typeUrl;
    return this.http.get(url).pipe(
      map(data => {
        return this.typeFeedAdapter.adapt(data);
      })
    );
  }

  getFeedData(feedUrl: string): Observable<FeedItem> {
    const url = feedUrl;
    return this.http.get(url).pipe(
      map(data => {
        return this.feedItemAdapter.adapt(data);
      })
    );
  }
}
