import { Component, OnInit } from '@angular/core';
import { GameSelectionService } from 'src/app/services/game-selection.service';

@Component({
  selector: 'app-number-selection',
  templateUrl: './number-selection.component.html',
  styleUrls: ['./number-selection.component.scss']
})
export class NumberSelectionComponent implements OnInit {
  public numberSelection = [28, 56];

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public generateImagePath(selection: number): string {
    return `assets/images/selection-${selection}.png`;
  }

  public onNumberSelect(selection: number){
    this.gameSelectionService.setNumberSelectionFlag = true;
    this.gameSelectionService.setNumberSelection = selection;
  }

}
