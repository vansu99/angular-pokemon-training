import { Component, OnInit } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { PokemonService } from '@features/pokemon/services/pokemon.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList!: Observable<PokemonList[]>
  query = new FormControl('')

  constructor(private _pokeService: PokemonService, private readonly router: Router) {
    this.pokemonList = this._pokeService.pokemonList$
  }

  ngOnInit(): void {
    this.loadPokemonList()
    this.onSearchPokemon()
  }

  loadPokemonList() {
    this._pokeService.getListPokemon()
  }

  onSearchPokemon() {}

  onEdit(id: number) {
    this.router.navigate(['', id, 'edit'])
  }
}
