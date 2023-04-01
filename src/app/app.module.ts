import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { GameBoardComponent } from './pages/game-board/game-board.component';
import { LandingComponent } from './pages/landing/landing.component';
import { InitialSelectionComponent } from './components/initial-selection/initial-selection.component';
import { GenerationSelectionComponent } from './components/generation-selection/generation-selection.component';
import { NumberSelectionComponent } from './components/number-selection/number-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    GameBoardComponent,
    LandingComponent,
    InitialSelectionComponent,
    GenerationSelectionComponent,
    NumberSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
