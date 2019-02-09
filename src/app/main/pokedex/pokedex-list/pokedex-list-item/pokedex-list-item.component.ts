import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Pokemon } from "../../pokedex-shared/models/pokemon.model";

@Component({
  selector: "pokedex-list-item",
  templateUrl: "./pokedex-list-item.component.html",
  styleUrls: ["./pokedex-list-item.component.css"]
})
export class PokedexListItemComponent {
  @Input() pokemon: Pokemon;
  _isActive: boolean;
  @Input()
  set isActive(val: boolean) {
    this.isActiveChange.emit(val);
    this._isActive = val;
  }
  get isActive() {
    return this._isActive;
  }
  @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  title = "This is the Pokedex Main Component";
}
