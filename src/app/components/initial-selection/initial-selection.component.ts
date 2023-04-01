import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameSelectionService } from 'src/app/services/game-selection.service';

import {SelectionConstants} from '../../shared/app.constants'; 

@Component({
  selector: 'app-initial-selection',
  templateUrl: './initial-selection.component.html',
  styleUrls: ['./initial-selection.component.scss']
})
export class InitialSelectionComponent implements OnInit {
  public initialSelections = [SelectionConstants.new, SelectionConstants.continue, SelectionConstants.instructions];
  private music = new Audio();

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public onSelectionClick(selection: string){
    this.setMusic();
    switch(selection){
      case SelectionConstants.new:
        this.gameSelectionService.setInitialSelection = true;
        break;
      case SelectionConstants.continue:
        break;
      case SelectionConstants.instructions:
        break;
    }
  }

  private setMusic(): void {
    this.gameSelectionService.setAudioSrc = 'assets/music/intro_edited.mp3';
    this.gameSelectionService.soundAllowanceFlag = true;
  }
}
