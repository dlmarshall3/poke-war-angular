import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameSelectionService } from 'src/app/services/game-selection.service';

@Component({
  selector: 'app-generation-selection',
  templateUrl: './generation-selection.component.html',
  styleUrls: ['./generation-selection.component.scss']
})
export class GenerationSelectionComponent implements OnInit {
  public generations = ['one', 'two', 'three'];

  constructor(private router: Router, private gameSelectionService: GameSelectionService) { }

  ngOnInit(): void {
  }

  public onGenerationSelection(generation: string){
    this.gameSelectionService.setGenerationSelection = generation;
    this.router.navigate(['game']);
  }

  public generateImagePath(generation: string){
    return `assets/images/generation-${generation}.png`;
  }

}
