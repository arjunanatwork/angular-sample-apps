import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public base_experience: number,
    public sprites: Sprites
  ) {}
}

export class Sprites {
  constructor(public front_default: string) {}
}

@Injectable({
  providedIn: "root"
})
export class PokemonAdapter implements Adapter<Pokemon> {
  adapt(feeditem: any): Pokemon {
    let sprites = new Sprites(feeditem.sprites.front_default);
    let item = new Pokemon(
      feeditem.id,
      feeditem.name,
      feeditem.weight,
      feeditem.base_experience,
      sprites
    );
    return item;
  }
}
