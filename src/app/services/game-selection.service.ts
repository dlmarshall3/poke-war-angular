import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameSelectionService {
  public initialSelectionMade: boolean = false;
  public numberSelectionMade: boolean = false;
  public gameHasStarted: boolean = false;
  public allowSound: boolean = false;
  public showModal: boolean = false;
  public selectedNumber: number = 0;
  public selectedGeneration: string = '';
  public audioSrc: string = '';

  constructor() { }

  public get hasGameStarted(): boolean {
    return this.gameHasStarted;
  }

  public get hasInitialSelectionBeenMade(): boolean {
    return this.initialSelectionMade;
  }

  public get hasNumberSelectionBeenMade(): boolean {
    return this.numberSelectionMade;
  }

  public get numberSelected(): number {
    return this.selectedNumber;
  }

  public get generationSelected(): string {
    return this.selectedGeneration;
  }

  public get doesUserWantSound(): boolean {
    return this.allowSound;
  }

  public get getMusicSrc(): string {
    return this.audioSrc;
  }

  public get getShowModalFlag(): boolean {
    return this.showModal;
  }

  public set setInitialSelection(selection: boolean) {
    this.initialSelectionMade = selection;
  }

  public set setNumberSelectionFlag(selection: boolean){
    this.numberSelectionMade = selection;
  }

  public set setNumberSelection(selection: number){
    this.selectedNumber = selection;
  }

  public set setGenerationSelection(selection: string){
    this.selectedGeneration = selection;
  }

  public set soundAllowanceFlag(selection: boolean){
    this.allowSound = selection;
  }

  public set setAudioSrc(selection: string){
    this.audioSrc = selection;
  }

  public set setShowModal(selection: boolean){
    this.showModal = selection;
  }

  public set setGameHasStartedFlag(selection: boolean){
    this.gameHasStarted = selection;
  }
}
