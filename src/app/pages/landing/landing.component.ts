import { Component, OnInit } from '@angular/core';
import { GameSelectionService } from 'src/app/services/game-selection.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public get initialSelectionFlag(): boolean {
    return this.gameSelectionService.hasInitialSelectionBeenMade;
  }

  public get numberSelectionFlag(): boolean {
    return this.gameSelectionService.hasNumberSelectionBeenMade;
  }

  public get showModalFlag(): boolean {
    return this.gameSelectionService.getShowModalFlag;
  }
}
