import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { PokemonService } from '@features/pokemon/services/pokemon.service'

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit{
  @Output() searchPoke = new EventEmitter<string>()
  query = new FormControl('')

  constructor(private readonly _pokeService: PokemonService) {}

  ngOnInit(): void {
    this.query.valueChanges.pipe(debounceTime(500)).subscribe(res => {
      this.searchPoke.emit(res)
    })
  }

  // searchPokemon(value: string) {
  //   this.searchPoke.emit(value)
  // }

}
