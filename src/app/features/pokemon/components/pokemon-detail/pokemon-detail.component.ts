import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { PokemonService } from '@features/pokemon/services/pokemon.service'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges, OnInit {
  @Input() id!: number;
  pokemonDetail!: PokemonList
  constructor(private readonly _pokeService: PokemonService) {
  }

  ngOnInit() {
    console.log('detail run')
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pokemonDetail = this._pokeService.getPokemon(changes.id.currentValue)
  }

}
