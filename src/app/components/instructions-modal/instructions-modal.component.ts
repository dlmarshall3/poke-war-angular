import { Component, OnInit } from '@angular/core';
import { GameSelectionService } from 'src/app/services/game-selection.service';

@Component({
  selector: 'app-instructions-modal',
  templateUrl: './instructions-modal.component.html',
  styleUrls: ['./instructions-modal.component.scss']
})
export class InstructionsModalComponent implements OnInit {

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public onCloseClick(): void {
    this.gameSelectionService.setShowModal = !this.gameSelectionService.getShowModalFlag;
  }

}
