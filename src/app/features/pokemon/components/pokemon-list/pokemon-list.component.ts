import { Component, OnInit } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { PokemonService } from '@features/pokemon/services/pokemon.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList!: Observable<PokemonList[]>

  constructor(private _pokeService: PokemonService, private readonly router: Router) {
    this.pokemonList = this._pokeService.pokemonList$
  }

  ngOnInit(): void {
    this.loadPokemonList()
  }

  loadPokemonList() {
    this._pokeService.getListPokemon()
  }

  onSearchPokemon(searchTerm: string) {
    if (searchTerm) {
      //this.pokemonList = this.pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()))
    } else {
      //this.pokemonList = this._pokeService.getListPokemon()
    }
  }

  onEdit(id: number) {
    this.router.navigate(['', id, 'edit'])
  }
}
