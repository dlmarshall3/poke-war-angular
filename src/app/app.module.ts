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
import { InstructionsModalComponent } from './components/instructions-modal/instructions-modal.component';
import { LogoComponent } from './components/logo/logo.component';
import { ModalComponent } from './components/modal/modal.component';
import { AudioModalComponent } from './components/audio-modal/audio-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    GameBoardComponent,
    LandingComponent,
    InitialSelectionComponent,
    GenerationSelectionComponent,
    NumberSelectionComponent,
    InstructionsModalComponent,
    LogoComponent,
    ModalComponent,
    AudioModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
