import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  @Output() searchPoke = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  searchPokemon(value: string) {
    this.searchPoke.emit(value)
  }

}
