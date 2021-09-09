import { Component, OnInit, ViewChild } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { PokemonService } from '@features/pokemon/services/pokemon.service'
import { ModalComponent } from '@shared/app-modal/modal.component'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  //@ViewChild('modal') modal: ModalComponent | undefined
  pokemonList: PokemonList[] = []
  currentPokemon!: number
  isOpen = false

  constructor(private _pokeService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonList = this._pokeService.getListPokemons()
  }

  onSearchPokemon(searchTerm: string) {
    if(searchTerm) {
      this.pokemonList = this.pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()))
    } else {
      this.pokemonList = this._pokeService.getListPokemons()
    }
  }

  showDetail(value: number) {
    this.currentPokemon = value
    this.isOpen = true
  }
}
