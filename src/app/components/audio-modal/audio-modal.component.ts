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

  public setSoundFlag(selection: boolean){
    if(selection){
      this.gameSelectionService.soundAllowanceFlag = true;
    } else {
      this.gameSelectionService.soundAllowanceFlag = false;
    }
  }

}
