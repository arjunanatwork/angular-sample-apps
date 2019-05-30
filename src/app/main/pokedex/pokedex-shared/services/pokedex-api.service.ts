import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonAdapter, Pokemon } from '../models/pokemon.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FeedItem, FeedItemAdapter } from '../models/feeditem.model';
import { CacheService } from 'src/app/shared/services/cache.service';
import { TypeFeedAdapter, TypeFeed } from '../models/type.model';

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
    let pokemonDataFromCache = this.checkCacheData(pokemonUrl);
    if (pokemonDataFromCache) {
      console.log('Data returned from Cache');
      return pokemonDataFromCache;
    }
    console.log('No Data returned from Cache, calling API');
    const url = pokemonUrl;
    return this.getPokemonData(url);
  }

  getPokemonByName(pokemonUrl: string, name: string): Observable<Pokemon> {
    const url = pokemonUrl + '/' + name;
    let pokemonDataByNameFromCache = this.checkCacheData(url);
    if (pokemonDataByNameFromCache) {
      console.log('Data returned from Cache');
      return pokemonDataByNameFromCache;
    }
    console.log('No Data returned from Cache, calling API');
    return this.getPokemonData(url);
  }

  getPokemonData(url: string): Observable<Pokemon> {
    return this.http.get(url).pipe(
      map(data => {
        let pokemonData = this.pokemonAdapter.adapt(data);
        this.cacheService.setDataToCache(url, pokemonData);
        return pokemonData;
      })
    );
  }

  checkCacheData(url: string): Observable<any> {
    return this.cacheService.getResponsefromCache(url);
  }

  getFeedData(feedUrl: string, feedType: string): Observable<any> {
    const url = feedUrl;
    switch (feedType) {
      case 'namedResource':
        return this.http.get(url).pipe(
          map(data => {
            return this.feedItemAdapter.adapt(data);
          })
        );
      case 'typeResource':
        return this.http.get(url).pipe(
          map(data => {
            return this.typeFeedAdapter.adapt(data);
          })
        );
      default:
        break;
    }
  }
}
