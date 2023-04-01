import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generation-selection',
  templateUrl: './generation-selection.component.html',
  styleUrls: ['./generation-selection.component.scss']
})
export class GenerationSelectionComponent implements OnInit {
  public generations = ['one', 'two', 'three'];

  constructor() { }

  ngOnInit(): void {
  }

  public onGenerationSelection(generation: string){
    console.log(generation);
  }

  public generateImagePath(generation: string){
    return `assets/images/generation-${generation}.png`;
  }

}
