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

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonInPlay = this.selectedPokemon;
    this.splitUpPokemon();
    this.drawPokemon();
  }

  private splitUpPokemon(){
    for(let i = 0; i < (this.pokemonInPlay.length / 2); i++){
      let pokemonIdx: number = this.pokedexIntegerArray.shift();
      this.playerOneDeck.push(this.pokemonInPlay[pokemonIdx]);
    }
    for(let i = 0; i < (this.pokemonInPlay.length / 2); i++){
      let pokemonIdx: number = this.pokedexIntegerArray.shift();
      this.playerTwoDeck.push(this.pokemonInPlay[pokemonIdx]);
    }
    console.log(this.playerOneDeck, this.playerTwoDeck)
  }

  private drawPokemon(){
    let playerOneActivePokemon = this.playerOneDeck.shift();
    let playerTwoActivePokemon = this.playerTwoDeck.shift();
    this.playerOneActiveArray.push(playerOneActivePokemon);
    this.playerTwoActiveArray.push(playerTwoActivePokemon);
  }

  public get selectedPokemon(){
    return this.pokemonService.getSelectedPokemon;
  }

}
