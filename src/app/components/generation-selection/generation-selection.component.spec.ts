import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationSelectionComponent } from './generation-selection.component';

describe('GenerationSelectionComponent', () => {
  let component: GenerationSelectionComponent;
  let fixture: ComponentFixture<GenerationSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
