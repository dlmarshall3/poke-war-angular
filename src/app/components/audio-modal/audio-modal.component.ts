import { Component, OnInit } from '@angular/core';

import { GameSelectionService } from '../../services/game-selection.service';

@Component({
  selector: 'app-audio-modal',
  templateUrl: './audio-modal.component.html',
  styleUrls: ['./audio-modal.component.scss']
})
export class AudioModalComponent implements OnInit {

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
    this.soundChoice();
  }

  public get doesUserWantSound(): boolean {
    return this.gameSelectionService.doesUserWantSound;
  }

  public soundChoice(){
    if(this.doesUserWantSound){
      return 'assets/images/other/sound.png';
    } else {
      return 'assets/images/other/no-sound.png'
    }
  }

  public setSoundFlag(){
    this.gameSelectionService.soundAllowanceFlag = !this.doesUserWantSound;
  }

}
