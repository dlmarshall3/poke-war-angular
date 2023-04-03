import { Component, OnInit } from '@angular/core';

import { fireEvent } from 'src/app/shared/helper-functions';
import { GameSelectionService } from 'src/app/services/game-selection.service';
import {SelectionConstants} from '../../shared/app.constants'; 

@Component({
  selector: 'app-initial-selection',
  templateUrl: './initial-selection.component.html',
  styleUrls: ['./initial-selection.component.scss']
})
export class InitialSelectionComponent implements OnInit {
  public initialSelections = [SelectionConstants.new, SelectionConstants.instructions, SelectionConstants.audio, SelectionConstants.scores];

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public onSelectionClick(selection: string){
    fireEvent('playMusic', true);
    switch(selection){
      case SelectionConstants.new:
        this.gameSelectionService.setInitialSelection = true;
        break;
      case SelectionConstants.continue:
        break;
      case SelectionConstants.instructions:
        this.gameSelectionService.setShowInstructionModal = !this.gameSelectionService.showInstructionModal;
        break;
      case SelectionConstants.audio:
        this.gameSelectionService.setShowAudioModal = !this.gameSelectionService.showAudioModal;
        break;
      case SelectionConstants.scores:
        break;
    }
  }
}
