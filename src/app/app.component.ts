import { Component, HostListener, OnInit, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';

import { GameSelectionService } from './services/game-selection.service';
import { fireEvent } from './shared/helper-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private music = new Audio();
  private sfx = new Audio();
  private cries = new Audio();
  private listeners: (() => void)[] = [];

  constructor(private gameSelectionService: GameSelectionService, private router: Router, private renderer: RendererFactory2){
    this.sfx.src = 'assets/music/select.wav';
    this.music.src = 'assets/music/intro_edited.mp3';
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent){
    if(event){
      this.sfx.play();
    }
  }

  public ngOnInit(){
    this.initiateSafeListeners();
    this.setLocalStorageSelections();
    this.router.navigate(['']);
  }

  public returnHome(){
    location.reload();
  }

  public get showInstructionModalFlag(): boolean {
    return this.gameSelectionService.getShowInstructionModalFlag;
  }

  public get showAudioModalFlag(): boolean {
    return this.gameSelectionService.getShowAudioModalFlag;
  }

  public get showWarModalFlag(): boolean {
    return this.gameSelectionService.getShowWarModalFlag;
  }

  private addSafeListener(eventName: string, handler: any){
    const renderer = this.renderer.createRenderer(null, null);
    const listener = renderer.listen(document, eventName, handler);
    this.listeners.push(listener);
  }

  private initiateSafeListeners(): void {
    this.addSafeListener('playMusic', (event: any) => {
      if(event.type === 'playMusic'){
        this.music.play();
      }
    });
    this.addSafeListener('pauseMusic', (event: any) => {
      if(event.type === 'pauseMusic'){
        this.music.pause();
      }
    });
    this.addSafeListener('muteAudio', (event: any) => {
      if(event.type === 'muteAudio'){
        this.music.muted = true;
        this.sfx.muted = true;
        this.cries.muted = true;
      }
    });
    this.addSafeListener('allowAudio', (event: any) => {
      if(event.type === 'allowAudio'){
        this.music.muted = false;
        this.sfx.muted = false;
        this.cries.muted = false;
      }
    });
    this.addSafeListener('warDeclared', (event: any) => {
      if(event.type === 'warDeclared'){
        this.gameSelectionService.setShowWarModal = true;
      }
    });
    this.addSafeListener('pokemonCry', (event: any) => {
      if(event.type === 'pokemonCry'){
        this.cries.src = `assets/audio/cries/${event.detail[0]}.wav`;
        this.cries.play();
      }
    });
    this.addSafeListener('setBattleMusic', (event: any) => {
      if(event.type === 'setBattleMusic'){
        switch(event.detail[0]){
          case 'one':
            this.music.src = 'assets/music/trainer_battle.mp3';
            this.music.play();
            break;
          case 'two':
            this.music.src = 'assets/music/trainer_battle_gs.mp3';
            this.music.play();
            break;
          case 'three':
            this.music.src = 'assets/music/trainer_battle_rs.mp3';
            this.music.play();
            break;
        }
      }
    });
  }

  private setLocalStorageSelections(): void {
    let audioFlag = JSON.parse(window.localStorage.getItem('allowAudio'));
    console.log(audioFlag);
    if(audioFlag === true || null){
      fireEvent('allowAudio', true);
    } else {
      fireEvent('muteAudio', true);
    }
  }

}
