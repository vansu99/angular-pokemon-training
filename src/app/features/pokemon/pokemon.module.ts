import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { ShareModule } from '@shared/share.module';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { CoreModule } from '@core/core.module'
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonFormComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [PokemonListComponent]
})
export class PokemonModule { }
