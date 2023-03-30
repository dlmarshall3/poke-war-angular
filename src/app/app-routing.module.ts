import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './pages/game-board/game-board.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  { path: 'game', component: GameBoardComponent },
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
