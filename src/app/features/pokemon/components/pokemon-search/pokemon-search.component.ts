import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { PokemonService } from '@features/pokemon/services/pokemon.service'

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent {
  @Output() searchPoke = new EventEmitter<string>()
  //query = new FormControl('')

  constructor(private readonly _pokeService: PokemonService) {
    // this.query.valueChanges.pipe(debounceTime(1000)).subscribe(res => {
    //   this._pokeService.filteringPokemon(res)
    // })
  }


  searchPokemon(value: string) {
    this.searchPoke.emit(value)
  }

}
