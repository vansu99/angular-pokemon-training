import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { PokemonService } from "@features/pokemon/services/pokemon.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  statusPokemon$ !: Observable<any>

  constructor(private readonly _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.statusPokemon$ = this._pokemonService.favoritePokemon$
  }

}
