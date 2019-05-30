import { Injectable } from '@angular/core';
import { Adapter } from '../core/adapter';

export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public height: number,
    public base_experience: number,
    public sprites: Sprites,
    public types: Type[],
    public abilities: Ability[]
  ) {}
}

export class Sprites {
  constructor(public front_default: string) {}
}

export class Type {
  constructor(public name: string, public url: string) {}
}

export class Ability {
  constructor(public name: string, public url: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class PokemonAdapter implements Adapter<Pokemon> {
  adapt(feeditem: any): Pokemon {
    let sprites = new Sprites(feeditem.sprites.front_default);
    // Map types
    const types = feeditem.types.map(i => new Type(i.type.name, i.type.url));
    const abilities = feeditem.abilities.map(
      i => new Ability(i.ability.name, i.ability.url)
    );

    const item = new Pokemon(
      feeditem.id,
      feeditem.name,
      feeditem.weight,
      feeditem.height,
      feeditem.base_experience,
      sprites,
      types,
      abilities
    );
    return item;
  }
}
