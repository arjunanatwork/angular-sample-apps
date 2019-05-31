import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokedexService } from '../pokedex-shared/services/pokedex-api.service';
import { FeedItem } from '../pokedex-shared/models/feeditem.model';

const apiBaseUrl = environment.pokedexApiBaseUrl;

@Component({
  selector: 'pokedex-header',
  providers: [PokedexService],
  templateUrl: './pokedex-header.component.html',
  styleUrls: ['./pokedex-header.component.css']
})
export class PokedexHeaderComponent implements OnInit {
  title = 'This is the Pokedex Header Component';
  feedItem: FeedItem;
  isActive: boolean = false;
  typeName: string;

  @Output() typeSelected = new EventEmitter<string>();
  @Output() nameSearch = new EventEmitter<string>();

  @ViewChild('pokemonName', { static: false }) pokemonName: ElementRef;

  constructor(private pokedexService: PokedexService) {}

  filterByType(type: string, name: string) {
    this.typeName = name;
    this.pokemonName.nativeElement.value = ''; // Reset Value when filter is selected
    this.typeSelected.emit(type);
  }

  searchByName(name: HTMLInputElement) {
    if (name.value) {
      this.typeName = null;
      this.nameSearch.emit(name.value.toLowerCase());
    } else {
      this.filterByType('all', 'all');
    }
  }

  getFeedData(url: string) {
    this.pokedexService.getFeedData(url, 'namedResource').subscribe(data => {
      this.feedItem = data;
    });
  }

  ngOnInit() {
    const typleUrl = apiBaseUrl + 'type';
    this.getFeedData(typleUrl);
    this.typeName = 'all'; // Deafult All Filter
  }
}
