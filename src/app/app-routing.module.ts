import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PokemonListComponent } from '@features/pokemon/components/pokemon-list/pokemon-list.component'
import { PokemonFormComponent } from '@features/pokemon/components/pokemon-form/pokemon-form.component'

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: PokemonListComponent },
      { path: 'add', component: PokemonFormComponent },
      { path: ':id/edit', component: PokemonFormComponent }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
