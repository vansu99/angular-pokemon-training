import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PokemonListComponent]
})
export class PokemonModule { }
