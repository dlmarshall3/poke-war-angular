import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() pokemonName: string = '';
  @Input() pokedex: number = 0;
  @Input() playerNumber: string = '';
  @Input() playerHP: number = 0;
  @Input() pokemonTotal: number = 0;
  @Input() statChange: number = null;
  @Input() roundResult: number = null;

  constructor() { }

  ngOnInit(): void {
  }

  public generatePokemonImage(): string {
    return `assets/images/pokemon/${this.pokedex}.png`
  }

  public checkForStatChange() {
    if(this.statChange === 2){
      return {color: 'green'}
    }
    if(this.statChange === 1){
      return {color: 'red'}
    } else {
      return null;
    }
  }

  public onRoundCompletion() {
    if(this.roundResult === 0){
      return {filter: 'contrast(0%) brightness(0%)'}
    } else {
      return null;
    }
  }
}
