import { Component, OnInit } from '@angular/core';
import { GameSelectionService } from './services/game-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poke-war-angular';
  public music = new Audio();

  constructor(private gameSelectionService: GameSelectionService){
  }

  ngOnInit(): void {
    this.playAudio();
  }

  public get allowSoundFlag(): boolean {
    return this.gameSelectionService.doesUserWantSound;
  }

  public get musicSrc(): string {
    return this.gameSelectionService.getMusicSrc;
  }

  private playAudio(){
      this.music.src = this.musicSrc;
      this.music.play();
    }
}
