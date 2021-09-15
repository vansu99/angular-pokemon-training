import { Injectable } from '@angular/core';
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import DataPokemon from '@features/pokemon/data/pokemon-data';
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { StorageService } from '@core/services/storage.service'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  filteredPokemon!: PokemonList[]
  pokemonList!: PokemonList[]

  constructor(private readonly httpClient: HttpClient, private readonly storageService: StorageService) {}

  getListPokemon() {
    const convertPokemon = DataPokemon.reduce((acc, cur) => {
      const infoPoke = { ...cur, type: cur.type.map(t => t.toLowerCase()) }
      // @ts-ignore
      acc.push(infoPoke)
      return acc
    }, [])
    this.pokemonList = this.storageService.getValue('pokemonList') || convertPokemon;
    this.filteredPokemon = [...this.pokemonList]
    return this.pokemonList
  }

  getPokemon(id: number) {
    const pokemon = this.pokemonList.find((poke) => {
      return poke.id === id
    })
    if(pokemon) {
      return of(pokemon)
    }else {
      return of({})
    }
  }

  filteringPokemon(query: string) {
    return this.pokemonList.filter(item => {
      return item.name.english.toLowerCase().includes(query.toLowerCase())
    })
  }

  getPokemonTypes(): Observable<any> {
    return this.httpClient.get<any>('https://pokeapi.co/api/v2/type').pipe(map(res => {return res.results}))
  }

  addPokemon(data: any) {
    const newPokemon = [...this.pokemonList, data]
    this.storageService.setObject('pokemonList', newPokemon)
    alert('Thêm mới thành công.')
  }

  // editPokemon(id: number, data: PokemonList) {
  //   const newPoke = [...this.pokemonList]
  //   const index = this.pokemonList.findIndex(poke => poke.id === id)
  //   newPoke[index] = data
  //   this.pokemonList = newPoke
  //   console.log(newPoke[index])
  //   this.storageService.setObject('pokemonList', this.pokemonList)
  // }
}
