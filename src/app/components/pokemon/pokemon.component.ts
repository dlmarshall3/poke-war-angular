import { Component, OnInit, Input } from '@angular/core';
import { GameSelectionService } from 'src/app/services/game-selection.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() pokemonName: string = '';
  @Input() pokedex: number = null;
  @Input() playerNumber: string = '';
  @Input() playerHP: number = null;
  @Input() pokemonTotal: number = null;
  @Input() statChange: number = null;
  @Input() roundResult: number = null;
  @Input() hpPercentage: number = 100;
  @Input() types: string[] = [];

  constructor(private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public generatePokemonImage(): string {
    return `assets/images/pokemon/${this.pokedex}.png`
  }

  public generateTypeOne(): string {
    return `assets/images/types/${this.types[0].toLowerCase()}.png`;
  }

  public generateTypeTwo(): string {
    if(this.types[1]){
      return `assets/images/types/${this.types[1].toLowerCase()}.png`
    } else {
      return null;
    }
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
      return {'filter': 'contrast(0%) brightness(0%)'}
    } else {
      return null;
    }
  }

  public checkForPlayerHP() {
    if(this.hpPercentage < 50 && this.hpPercentage >= 20){
      return {'background-color': '#f8c81e', 'width': `${this.hpPercentage}%`}
    } else if (this.hpPercentage < 20){
      return {'background-color': '#af3e3f', 'width': `${this.hpPercentage}%`}
    } else {
      return {'background-color': '#20df26', 'width': `${this.hpPercentage}%`}
    }
  }

  public get gameHasStarted(): boolean {
    return this.gameSelectionService.hasGameStarted;
  }

  private setHPWidth(){
    return {}
  }
}
