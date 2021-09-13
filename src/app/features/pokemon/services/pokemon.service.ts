import { Injectable } from '@angular/core';
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import DataPokemon from '@features/pokemon/data/pokemon-data';
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _pokemonList$ = new BehaviorSubject<PokemonList[]>([])
  pokemonList$ = this._pokemonList$.asObservable()

  constructor(private httpClient: HttpClient) {}

  getListPokemon(): PokemonList[] {
    return JSON.parse(<string>localStorage.getItem('pokemonList')) || DataPokemon;
  }

  getPokemon(id: number | string): any {
    return DataPokemon.find(poke => poke.id === id)
  }

  getPokemonTypes(): Observable<any> {
    return this.httpClient.get<any>('https://pokeapi.co/api/v2/type').pipe(map(res => {return res.results}))
  }

  addPokemon(data: any): PokemonList[] {
    const newPokemom = [...DataPokemon, data]
    localStorage.setItem('pokemonList', JSON.stringify(newPokemom))
    alert('Thêm mới thành công.')
    return newPokemom
  }
}
