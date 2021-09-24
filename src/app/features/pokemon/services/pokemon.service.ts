import { Injectable } from '@angular/core';
import { PokemonList } from '@features/pokemon/models/pokemon.model';
import DataPokemon from '@features/pokemon/data/pokemon-data';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonList$!: Observable<PokemonList[]>;
  private pokemonSubject = new BehaviorSubject<PokemonList[]>([]);

  favoritePokemon$!: Observable<{ likes: number; dislikes: number }>;
  private favoritePokemonSubject = new BehaviorSubject<any>(
    this.storageService.getValue('status') || { likes: 0, dislikes: 0 },
  );

  constructor(
    private router: Router,
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService,
  ) {
    this.pokemonList$ = this.pokemonSubject.asObservable();
    this.favoritePokemon$ = this.favoritePokemonSubject.asObservable();
  }

  getListPokemon() {
    const convertPokemon: PokemonList[] = DataPokemon.reduce((acc, cur) => {
      const infoPoke = { ...cur, type: cur.type.map((t) => t.toLowerCase()) };
      // @ts-ignore
      acc.push(infoPoke);
      return acc;
    }, []);

    return of(this.storageService.getValue<PokemonList[]>('pokemonList') || convertPokemon)
      .pipe(map((pokemon) => this.pokemonSubject.next(pokemon)))
      .subscribe();
  }

  getPokemon(id: number) {
    return this.pokemonSubject.pipe(
      map((pokemon) => pokemon.find((item) => item.id === Number(id))),
    );
  }

  getPokemonTypes(): Observable<any> {
    return this.httpClient.get<any>('https://pokeapi.co/api/v2/type').pipe(
      map((res) => {
        return res.results;
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  nextPokemon(id: number) {
    this.router.navigate(['', Number(id) + 1]);
  }

  prevPokemon(id: number) {
    this.router.navigate(['', Number(id) - 1]);
  }

  likePokemon() {
    const currentValue = this.favoritePokemonSubject.getValue();
    const likes = {
      ...currentValue,
      likes: currentValue.likes + 1,
    };
    this.storageService.setObject('status', likes);
    this.favoritePokemonSubject.next(likes);
  }

  dislikePokemon() {
    const currentValue = this.favoritePokemonSubject.getValue();
    const dislikes = {
      ...currentValue,
      dislikes: currentValue.dislikes + 1,
    };
    this.storageService.setObject('status', dislikes);
    this.favoritePokemonSubject.next(dislikes);
  }

  addPokemon(data: any) {
    const newPokemon: PokemonList[] = [...this.pokemonSubject.getValue(), data];
    this.pokemonSubject.next(newPokemon);
    this.storageService.setObject('pokemonList', newPokemon);
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
