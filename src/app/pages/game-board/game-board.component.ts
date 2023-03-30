import { Component, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/components/pokemon/pokemon.interface';

import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  public pokemonInPlay: IPokemon[] = [];
  public playerOneDeck: any[] = [];
  public playerOneActiveArray: any[] = [];
  public playerTwoDeck: any[] = [];
  public playerTwoActiveArray: any[] = [];
  public pokedexIntArray: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonInPlay = this.selectedPokemon;
    this.pokedexIntArray = this.createPokedexIntegerArray();
    this.splitUpPokemon();
    this.drawPokemon();
  }

  private splitUpPokemon(){
    for(let i = 0; i < (this.pokemonInPlay.length / 2); i++){
      let pokemonIdx = this.pokedexIntArray.shift();
      this.playerOneDeck.push(this.pokemonInPlay[pokemonIdx-1]);
    }
    for(let i = 0; i < (this.pokemonInPlay.length / 2); i++){
      let pokemonIdx = this.pokedexIntArray.shift();
      this.playerTwoDeck.push(this.pokemonInPlay[pokemonIdx-1]);
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
      Array.from({length: this.pokemonInPlay.length}, (_, i) => i + 1)
      );
  }

  public get selectedPokemon(){
    return this.pokemonService.getSelectedPokemon;
  }

}
