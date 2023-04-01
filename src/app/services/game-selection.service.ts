import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameSelectionService {
  public initialSelectionMade: boolean = false;
  public numberSelectionMade: boolean = false;

  constructor() { }

  public get hasInitialSelectionBeenMade(): boolean {
    return this.initialSelectionMade;
  }

  public get hasNumberSelectionBeenMade(): boolean {
    return this.numberSelectionMade;
  }

  public set setInitialSelection(selection: boolean) {
    this.initialSelectionMade = selection;
  }

  public set setNumberSelectionFlag(selection: boolean){
    this.numberSelectionMade = selection;
  }
}
