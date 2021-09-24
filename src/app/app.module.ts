import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PokemonModule } from '@features/pokemon/pokemon.module';
import { ShareModule } from '@shared/share.module';
import { AppRoutingModule } from './app-routing.module'
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PokemonModule, ShareModule, AppRoutingModule, RouterModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
