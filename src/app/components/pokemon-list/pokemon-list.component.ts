import { PokemonList } from './../../models/Pokemon-list.model';
import { Component, OnInit } from '@angular/core';
import DataPokemon from '../../fakeData/pokemonList';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonList[] = [];
  constructor() {}

  ngOnInit(): void {
    this.pokemonList = DataPokemon;
    //console.log(this.pokemonList);
  }
}
