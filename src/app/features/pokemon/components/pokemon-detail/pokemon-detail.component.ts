import { Component, OnInit } from '@angular/core'
import { PokemonList } from '@features/pokemon/models/pokemon.model'
import { PokemonService } from '@features/pokemon/services/pokemon.service'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { pluck, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail$ !: Observable<PokemonList>
  constructor(private readonly route: ActivatedRoute, private readonly _pokeService: PokemonService) {
  }

  ngOnInit() {
   this.getPokemonDetail()
  }

  getPokemonDetail() {
    // @ts-ignore
    this.pokemonDetail$ = this.route.params.pipe(
      pluck("id"),
      switchMap((id) => this._pokeService.getPokemon(id))
    )
  }

  nextPokemon(id: number) {
    this._pokeService.nextPokemon(id)
  }

  prevPokemon(id: number) {
    this._pokeService.prevPokemon(id)
  }

}
