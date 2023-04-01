import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IPokemon } from 'src/app/components/pokemon/pokemon.interface';
import { GameSelectionService } from 'src/app/services/game-selection.service';

import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  @ViewChild('playButton') playButton: HTMLButtonElement;
  @Output() playerOnePkmnTotal: number = 0;
  @Output() playerTwoPkmnTotal: number = 0;
  @Output() playerOneStatChange: number = 0;
  @Output() playerTwoStatChange: number = 0;
  @Output() playerOneResult: number = null;
  @Output() playerTwoResult: number = null;

  public deckSize: number = 0;
  public playerOneDeck: IPokemon[] = [];
  public playerOneActiveArray: IPokemon[] = [];
  public playerOneActivePokemon: IPokemon = {} as IPokemon;
  public playerTwoDeck: IPokemon[] = [];
  public playerTwoActiveArray: IPokemon[] = [];
  public playerTwoActivePokemon: IPokemon = {} as IPokemon;
  public pokedexIntArray: any[] = [];
  public playCount: number = 0;
  public buttonDisabled: boolean = false;

  constructor(private pokemonService: PokemonService, private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
    // this.deckSize = this.gameSelectionService.numberSelected;
    this.deckSize = 56;
    this.pokedexIntArray = this.createPokedexIntegerArray();
    this.splitUpPokemon();
    this.drawPokemon();
  }

  private splitUpPokemon(){
    for(let i = 0; i < (this.deckSize / 2); i++){
      let pokemonIdx = this.pokedexIntArray.shift();
      this.playerOneDeck.push(this.selectedPokemon[pokemonIdx-1]);
    }
    for(let i = 0; i < (this.deckSize / 2); i++){
      let pokemonIdx = this.pokedexIntArray.shift();
      this.playerTwoDeck.push(this.selectedPokemon[pokemonIdx-1]);
    }
  }

  private drawPokemon(){
    this.playerOneActivePokemon = this.playerOneDeck.shift();
    this.playerTwoActivePokemon = this.playerTwoDeck.shift();
    this.playerOnePkmnTotal = this.playerOneActivePokemon.total;
    this.playerTwoPkmnTotal = this.playerTwoActivePokemon.total;
    this.playerOneActiveArray.push(this.playerOneActivePokemon);
    this.playerTwoActiveArray.push(this.playerTwoActivePokemon);
  }

  private createPokedexIntegerArray(){
    return this.pokemonService.shuffleArray(
      Array.from({length: this.selectedPokemon.length}, (_, i) => i + 1)
      );
  }

  public get selectedPokemon(){
    return this.pokemonService.getSelectedPokemon;
  }

  public battlePokemon(): void {
    this.playCount++;
    this.buttonDisabled = true;
    this.firstTypeCheck();
    this.immuneCheck();
    this.resistanceCheck();
    this.finalComparisonCheck();
    this.buttonDisabled = false;
  }

  private firstTypeCheck(): void {
    if(this.playerOneActivePokemon.total < this.playerTwoActivePokemon.total){
      this.secondTypeCheck(this.playerOneActivePokemon, this.playerTwoActivePokemon);
    } else {
      this.secondTypeCheck(this.playerTwoActivePokemon, this.playerOneActivePokemon);
    }
  }

  private secondTypeCheck(weakerPokemon: IPokemon, strongerPokemon: IPokemon): void {
    if(strongerPokemon.weakness.includes(weakerPokemon.typeOne) || (strongerPokemon.weakness.includes(weakerPokemon.typeTwo))){
      if(weakerPokemon.weakness.includes(strongerPokemon.typeOne) || (weakerPokemon.weakness.includes(strongerPokemon.typeTwo))){
        this.playerOnePkmnTotal += 50;
        this.playerTwoPkmnTotal += 50;
      } else {
        this.playerOnePkmnTotal += 100;
      }
    }
  }

  private immuneCheck(): void {
    if(this.playerOneActivePokemon.immune !== null){
      if((this.playerOneActivePokemon.immune.includes(this.playerTwoActivePokemon.typeOne)) || (this.playerOneActivePokemon.immune.includes(this.playerTwoActivePokemon.typeTwo))){
        this.playerTwoPkmnTotal -= 75;
      }
    }
    if(this.playerTwoActivePokemon.immune !== null){
      if((this.playerTwoActivePokemon.immune.includes(this.playerOneActivePokemon.typeOne)) || (this.playerTwoActivePokemon.immune.includes(this.playerOneActivePokemon.typeTwo))){
        this.playerOnePkmnTotal -= 75;
      }
    }
  }

    private resistanceCheck(): void {
      if(this.playerOneActivePokemon.resistant !== null){
        if((this.playerOneActivePokemon.resistant.includes(this.playerTwoActivePokemon.typeOne)) || (this.playerOneActivePokemon.resistant.includes(this.playerTwoActivePokemon.typeTwo))){
          this.playerTwoPkmnTotal -= 75;
        }
      }
      if(this.playerTwoActivePokemon.resistant !== null){
        if((this.playerTwoActivePokemon.resistant.includes(this.playerOneActivePokemon.typeOne)) || (this.playerTwoActivePokemon.resistant.includes(this.playerOneActivePokemon.typeTwo))){
          this.playerOnePkmnTotal -= 75;
        }
      }
    }

    private finalComparisonCheck(): void {
      this.setTotalColoring();
      if(this.playerOnePkmnTotal > this.playerTwoPkmnTotal){
        this.playerOneResult = 1;
        this.playerTwoResult = 0;
      } else {
        this.playerTwoResult = 1;
        this.playerOneResult = 0;
      }
    }

    private setTotalColoring(): void {
      if(this.playerOneActivePokemon.total < this.playerOnePkmnTotal){
        this.playerOneStatChange = 2;
      }
      if(this.playerOneActivePokemon.total > this.playerOnePkmnTotal){
        this.playerOneStatChange = 1;
      }
      if(this.playerTwoActivePokemon.total < this.playerTwoPkmnTotal){
        this.playerTwoStatChange = 2;
      }
      if(this.playerTwoActivePokemon.total > this.playerTwoPkmnTotal){
        this.playerTwoStatChange = 1;
      }
    }
}
