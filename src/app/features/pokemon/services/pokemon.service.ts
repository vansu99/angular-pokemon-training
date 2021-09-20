import { Injectable } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import DataPokemon from '@features/pokemon/data/pokemon-data'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonSubject = new BehaviorSubject<PokemonList[]>([])
  pokemonList$ = this.pokemonSubject.asObservable()

  constructor(
    private router: Router,
    private readonly httpClient: HttpClient
  ) {}

  getListPokemon(): void {
    console.log('run list')
    const convertPokemon = DataPokemon.reduce((acc, cur) => {
      const infoPoke = { ...cur, type: cur.type.map((t) => t.toLowerCase()) }
      // @ts-ignore
      acc.push(infoPoke)
      return acc
    }, [])
    const currentValue = this.pokemonSubject.getValue()
    return this.pokemonSubject.next([...convertPokemon, ...currentValue])
  }

  getPokemon(id: number) {
    return this.pokemonSubject.pipe(
      map((pokemon) => pokemon.find((item) => item.id === Number(id))),
    )
  }

  getPokemonTypes(): Observable<any> {
    return this.httpClient.get<any>('https://pokeapi.co/api/v2/type').pipe(
      map((res) => {
        return res.results
      }),
    )
  }

  nextPokemon(id: number) {
    this.router.navigate(['', Number(id) + 1])
  }

  prevPokemon(id: number) {
    this.router.navigate(['', Number(id) - 1])
  }

  addPokemon(data: any) {
    const currentPoke = this.pokemonSubject.getValue()
    currentPoke.push(data)
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
