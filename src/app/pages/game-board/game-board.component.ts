import { Component, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/components/pokemon/pokemon.interface';
import { GameSelectionService } from 'src/app/services/game-selection.service';

import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  public deckSize: number = 0;
  public playerOneDeck: IPokemon[] = [];
  public playerOneActiveArray: IPokemon[] = []!;
  public playerTwoDeck: IPokemon[] = [];
  public playerTwoActiveArray: IPokemon[] = [];
  public pokedexIntArray: any[] = [];

  private music = new Audio();

  constructor(private pokemonService: PokemonService, private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
    this.deckSize = 56;
    this.pokedexIntArray = this.createPokedexIntegerArray();
    this.splitUpPokemon();
    this.drawPokemon();
  }

  private splitUpPokemon(){
    // need to change pokemonInPlay to number selected (52)
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
    let playerOneActivePokemon = this.playerOneDeck.shift();
    let playerTwoActivePokemon = this.playerTwoDeck.shift();
    this.playerOneActiveArray.push(playerOneActivePokemon);
    this.playerTwoActiveArray.push(playerTwoActivePokemon);
    console.log(this.playerOneActiveArray)
  }

  private createPokedexIntegerArray(){
    return this.pokemonService.shuffleArray(
      Array.from({length: this.selectedPokemon.length}, (_, i) => i + 1)
      );
  }

  public get selectedPokemon(){
    return this.pokemonService.getSelectedPokemon;
  }

}
