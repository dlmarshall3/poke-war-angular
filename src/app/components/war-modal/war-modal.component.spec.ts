import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarModalComponent } from './war-modal.component';

describe('WarModalComponent', () => {
  let component: WarModalComponent;
  let fixture: ComponentFixture<WarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
