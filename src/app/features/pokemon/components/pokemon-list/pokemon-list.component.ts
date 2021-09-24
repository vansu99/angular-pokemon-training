import { Component, OnInit } from "@angular/core";
import { PokemonList } from "@features/pokemon/models/pokemon.model";
import { PokemonService } from "@features/pokemon/services/pokemon.service";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { debounceTime, map, startWith, tap } from "rxjs/operators";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonList[] = [];
  filteredPokemon: PokemonList[] = []
  query = new FormControl('');

  constructor(private _pokeService: PokemonService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadPokemonList();
    this.onSearchPokemon();
  }

  loadPokemonList() {
    console.log('load...')
    this._pokeService.getListPokemon();
    this._pokeService.pokemonList$.pipe(map(pokemon => {
      this.pokemonList = pokemon
      this.filteredPokemon = pokemon
    })).subscribe()
  }

  onSearchPokemon() {
    this.query.valueChanges.pipe(
      debounceTime(600),
      map((searchTerm) => searchTerm.toLowerCase()),
      tap(search => {
        this.filteredPokemon = this.pokemonList.filter(pokemon => pokemon.name.english.toLowerCase().includes(search))
      }),
      startWith("")
    ).subscribe()
  }

  onEdit(id: number) {
    this.router.navigate(['', id, 'edit']);
  }
}
