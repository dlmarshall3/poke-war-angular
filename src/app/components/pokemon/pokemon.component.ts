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

  constructor() { }

  ngOnInit(): void {
  }

  public generatePokemonImage(): string {
    return `assets/images/pokemon/${this.pokedex}.png`
  }

}
