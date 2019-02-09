import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class TypeFeed {
  constructor(public name: string, public pokemon: TypePokemons[]) {}
}

export class TypePokemons {
  constructor(public name: string, public url: string) {}
}

@Injectable({
  providedIn: "root"
})
export class TypeFeedAdapter implements Adapter<TypeFeed> {
  adapt(feeditem: any): TypeFeed {
    let item = new TypeFeed(
      feeditem.name,
      feeditem.pokemon.map(i => new TypePokemons(i.pokemon.name, i.pokemon.url))
    );
    return item;
  }
}
