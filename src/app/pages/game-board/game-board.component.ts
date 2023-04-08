import { Component, OnInit, Output, ViewChild } from '@angular/core';

import { fireEvent } from 'src/app/shared/helper-functions';
import { IPokemon } from 'src/app/components/pokemon/pokemon.interface';
import { GameSelectionService } from 'src/app/services/game-selection.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  @ViewChild('playButton') playButton: HTMLButtonElement;
  @Output() playerOnePkmnTotal: number = 0;
  @Output() playerTwoPkmnTotal: number = 0;
  @Output() playerOneStatChange: number = 0;
  @Output() playerTwoStatChange: number = 0;
  @Output() playerOneResult: number = null;
  @Output() playerTwoResult: number = null;
  @Output() playerOnePercentage: number = 0;
  @Output() playerTwoPercentage: number = 0;

  public deckSize: number = 0;
  public buttonDisabled: boolean = false;
  public playCount: number = 0;
  public pokedexIntArray: any[] = [];

  public playerOneDeck: IPokemon[] = [];
  public playerOneActiveArray: IPokemon[] = [];
  public playerOneActivePokemon: IPokemon = {} as IPokemon;
  public playerOnePlayedPokemon: IPokemon[] = [];
  public playerOneScore: number = 0;

  public playerTwoDeck: IPokemon[] = [];
  public playerTwoActiveArray: IPokemon[] = [];
  public playerTwoActivePokemon: IPokemon = {} as IPokemon;
  public playerTwoPlayedPokemon: IPokemon[] = [];
  public playerTwoScore: number = 0;

  constructor(
    private pokemonService: PokemonService,
    private gameSelectionService: GameSelectionService
  ) {}

  ngOnInit(): void {
    this.deckSize = this.gameSelectionService.numberSelected;
    this.pokedexIntArray = this.createPokedexIntegerArray();
    this.splitUpPokemon();
  }

  private splitUpPokemon() {
    for (let i = 0; i < this.deckSize / 2; i++) {
      let pokemonIdx = this.pokedexIntArray.shift();
      this.playerOneDeck.push(this.selectedPokemon[pokemonIdx - 1]);
    }
    for (let i = 0; i < this.deckSize / 2; i++) {
      let pokemonIdx = this.pokedexIntArray.shift();
      this.playerTwoDeck.push(this.selectedPokemon[pokemonIdx - 1]);
    }
  }

  private createPokedexIntegerArray() {
    return this.pokemonService.shuffleArray(
      Array.from({ length: this.selectedPokemon.length }, (_, i) => i + 1)
    );
  }

  public get selectedPokemon() {
    return this.pokemonService.getSelectedPokemon;
  }

  public battlePokemon(): void {
    this.resetStyling();
    this.drawPokemon();
    this.playCount++;
    this.buttonDisabled = true;
    setTimeout(() => {
      this.determineTypeCheck();
      this.immuneCheck();
      this.resistanceCheck();
    }, 400);
    setTimeout(() => {
      this.finalComparisonCheck();
    }, 500);
    this.distributePokemon();
    this.checkCardCount();
    this.updateScore();
    setTimeout(() => {
      this.buttonDisabled = false;
    }, 500);
  }

  private drawPokemon() {
    this.gameSelectionService.setGameHasStartedFlag = true;
    this.playerOneActivePokemon = this.playerOneDeck.shift();
    this.playerTwoActivePokemon = this.playerTwoDeck.shift();
    this.playerOnePkmnTotal = this.playerOneActivePokemon.total;
    this.playerTwoPkmnTotal = this.playerTwoActivePokemon.total;
    this.playerOneActiveArray.push(this.playerOneActivePokemon);
    this.playerTwoActiveArray.push(this.playerTwoActivePokemon);
  }

  private determineTypeCheck(): void {
    if (this.playerOnePkmnTotal === this.playerTwoPkmnTotal) {
      this.equalTotalCheck();
    } else {
      this.differentTotalCheck();
    }
  }

  private equalTotalCheck(): void {
    if (this.playerTwoActivePokemon.weakness.includes(this.playerOneActivePokemon.typeOne) ||
      this.playerTwoActivePokemon.weakness.includes(
        this.playerOneActivePokemon.typeTwo
      )
    ) {
      this.playerOnePkmnTotal += 100;
    }
    if (
      this.playerOneActivePokemon.weakness.includes(
        this.playerTwoActivePokemon.typeOne
      ) ||
      this.playerOneActivePokemon.weakness.includes(
        this.playerTwoActivePokemon.typeTwo
      )
    ) {
      this.playerTwoPkmnTotal += 100;
    }
  }

  private differentTotalCheck(): void {
    if (this.playerOnePkmnTotal < this.playerTwoPkmnTotal) {
      if (this.playerTwoActivePokemon.weakness.includes(this.playerOneActivePokemon.typeOne) || 
        this.playerTwoActivePokemon.weakness.includes(this.playerOneActivePokemon.typeTwo)) {
        if (this.playerOneActivePokemon.weakness.includes(this.playerTwoActivePokemon.typeOne) || 
          this.playerOneActivePokemon.weakness.includes(this.playerTwoActivePokemon.typeTwo)) {
            this.playerOnePkmnTotal += 50;
            this.playerTwoPkmnTotal += 50;
        } else {
            this.playerOnePkmnTotal += 100;
          }
        }
    } else {
      if (this.playerOneActivePokemon.weakness.includes(this.playerTwoActivePokemon.typeOne) ||
          this.playerOneActivePokemon.weakness.includes(this.playerTwoActivePokemon.typeTwo)) {
        if (this.playerTwoActivePokemon.weakness.includes(this.playerOneActivePokemon.typeOne) ||
          this.playerTwoActivePokemon.weakness.includes(this.playerOneActivePokemon.typeTwo)) {
            this.playerOnePkmnTotal += 50;
            this.playerTwoPkmnTotal += 50;
        } else {
            this.playerTwoPkmnTotal += 100;
        }
      }
    }
  }

  private immuneCheck(): void {
    if (this.playerOneActivePokemon.immune !== null) {
      if (
        this.playerOneActivePokemon.immune.includes(
          this.playerTwoActivePokemon.typeOne
        ) ||
        this.playerOneActivePokemon.immune.includes(
          this.playerTwoActivePokemon.typeTwo
        )
      ) {
        this.playerTwoPkmnTotal -= 75;
      }
    }
    if (this.playerTwoActivePokemon.immune !== null) {
      if (
        this.playerTwoActivePokemon.immune.includes(
          this.playerOneActivePokemon.typeOne
        ) ||
        this.playerTwoActivePokemon.immune.includes(
          this.playerOneActivePokemon.typeTwo
        )
      ) {
        this.playerOnePkmnTotal -= 75;
      }
    }
  }

  private resistanceCheck(): void {
    if (this.playerOneActivePokemon.resistant !== null) {
      if (
        this.playerOneActivePokemon.resistant.includes(
          this.playerTwoActivePokemon.typeOne
        ) ||
        this.playerOneActivePokemon.resistant.includes(
          this.playerTwoActivePokemon.typeTwo
        )
      ) {
        this.playerTwoPkmnTotal -= 75;
      }
    }
    if (this.playerTwoActivePokemon.resistant !== null) {
      if (
        this.playerTwoActivePokemon.resistant.includes(
          this.playerOneActivePokemon.typeOne
        ) ||
        this.playerTwoActivePokemon.resistant.includes(
          this.playerOneActivePokemon.typeTwo
        )
      ) {
        this.playerOnePkmnTotal -= 75;
      }
    }
  }

  private finalComparisonCheck(): void {
    this.setTotalColoring();
    if (this.playerOnePkmnTotal > this.playerTwoPkmnTotal) {
      this.playerOneResult = 1;
      this.playerTwoResult = 0;
      fireEvent('pokemonCry', [this.playerTwoActivePokemon.pokedex])
    } else {
      this.playerTwoResult = 1;
      this.playerOneResult = 0;
      fireEvent('pokemonCry', [this.playerOneActivePokemon.pokedex])
    }
  }

  private setTotalColoring(): void {
    if (this.playerOneActivePokemon.total < this.playerOnePkmnTotal) {
      this.playerOneStatChange = 2;
    }
    if (this.playerOneActivePokemon.total > this.playerOnePkmnTotal) {
      this.playerOneStatChange = 1;
    }
    if (this.playerTwoActivePokemon.total < this.playerTwoPkmnTotal) {
      this.playerTwoStatChange = 2;
    }
    if (this.playerTwoActivePokemon.total > this.playerTwoPkmnTotal) {
      this.playerTwoStatChange = 1;
    }
  }

  private distributePokemon(): void {
    if (this.playerOnePkmnTotal > this.playerTwoPkmnTotal) {
      this.playerOnePlayedPokemon.push(
        this.playerOneActivePokemon,
        this.playerTwoActivePokemon
      );
    } else {
      this.playerTwoPlayedPokemon.push(
        this.playerOneActivePokemon,
        this.playerTwoActivePokemon
      );
    }
    this.playerOneActiveArray = [];
    this.playerTwoActiveArray = [];
  }

  private checkCardCount(): void {
    if (
      this.playerOneDeck.length === 0 &&
      this.playerOnePlayedPokemon.length > 0
    ) {
      this.refillHand('one');
    }
    if (
      this.playerTwoDeck.length === 0 &&
      this.playerTwoPlayedPokemon.length > 0
    ) {
      this.refillHand('two');
    }
  }

  private refillHand(player: string) {
    switch (player) {
      case 'one':
        for (let mon of this.playerOnePlayedPokemon) {
          this.playerOneDeck.push(mon);
        }
        this.playerOnePlayedPokemon = [];
        break;
      case 'two':
        for (let mon of this.playerTwoPlayedPokemon) {
          this.playerTwoDeck.push(mon);
        }
        this.playerTwoPlayedPokemon = [];
        break;
    }
  }

  private resetStyling(): void {
    this.playerOneResult = null;
    this.playerTwoResult = null;
    this.playerOneResult = null;
    this.playerTwoResult = null;
    this.playerOneStatChange = null;
    this.playerTwoStatChange = null;
  }

  private updateScore() {
    this.playerOneScore =
      this.playerOneDeck.length +
      this.playerOnePlayedPokemon.length +
      this.playerOneActiveArray.length;
    this.playerTwoScore =
      this.playerTwoDeck.length +
      this.playerTwoPlayedPokemon.length +
      this.playerTwoActiveArray.length;
    this.playerOnePercentage = (this.playerOneScore / this.deckSize) * 100;
    this.playerTwoPercentage = (this.playerTwoScore / this.deckSize) * 100;
  }
}
