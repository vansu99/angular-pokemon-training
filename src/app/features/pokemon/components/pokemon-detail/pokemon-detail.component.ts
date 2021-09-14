import { Component, Input, OnInit } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { PokemonService } from '@features/pokemon/services/pokemon.service'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  @Input() id!: number;
  pokemonDetail!: PokemonList
  constructor(private readonly _pokeService: PokemonService) {
  }

  ngOnInit() {
   this._pokeService.getPokemon(this.id).subscribe(poke => {
     // @ts-ignore
     this.pokemonDetail = poke
   })
  }

}
