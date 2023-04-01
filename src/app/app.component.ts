import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameSelectionService } from './services/game-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poke-war-angular';

  constructor(private gameSelectionService: GameSelectionService, private router: Router){
  }

  public ngOnInit(){
    this.router.navigate(['game']);
  }

  public get showModalFlag(): boolean {
    return this.gameSelectionService.getShowModalFlag;
  }

}
