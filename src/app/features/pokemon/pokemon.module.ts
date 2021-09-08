import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { ShareModule } from '@shared/share.module'



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonSearchComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [PokemonListComponent]
})
export class PokemonModule { }
