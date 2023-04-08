import { Component, OnInit } from '@angular/core';

import { GameSelectionService } from 'src/app/services/game-selection.service';
import { fireEvent } from 'src/app/shared/helper-functions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public onCloseClick(): void {
    if(this.gameSelectionService.showInstructionModal){
      this.gameSelectionService.setShowInstructionModal = !this.gameSelectionService.showInstructionModal;
    }
    if(this.gameSelectionService.showAudioModal){
      this.gameSelectionService.setShowAudioModal = !this.gameSelectionService.showAudioModal;
    }
    if(this.gameSelectionService.showWarModal){
      this.gameSelectionService.setShowWarModal = !this.gameSelectionService.showWarModal;
      fireEvent('closeWarModal', true);
    }
  }

}
