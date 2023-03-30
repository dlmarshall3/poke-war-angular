import { Injectable } from '@angular/core';

import { pokemonList } from '../data/pokemon-list';
import { IPokemon } from '../components/pokemon/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public allPokemon = pokemonList;
  public selectedPokemonList: IPokemon[] = [];

  constructor() {}

  public populatePokemonFromSelection(generation: string): void {
    switch (generation) {
      case 'one':
        this.selectedPokemonList = this.allPokemon.slice(0, 151);
        break;
      case 'two':
        this.selectedPokemonList = this.allPokemon.slice(0, 251);
        break;
      case 'three':
        this.selectedPokemonList = this.allPokemon.slice(0, 386);
        break;
    }
  }

  public shuffleArray(array: any): any {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public get getSelectedPokemon(): IPokemon[] {
    this.populatePokemonFromSelection('one');
    return this.selectedPokemonList;
  }
}
