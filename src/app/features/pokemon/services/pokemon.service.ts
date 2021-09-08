import { Injectable } from '@angular/core';
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import DataPokemon from '@features/pokemon/data/pokemon-data';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  getListPokemons(): PokemonList[] {
    return DataPokemon;
  }

  getPokemon(id: number): any {
    return DataPokemon.find(poke => poke.id === id)
  }
}
