import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoCoinComponent } from './meteo-coin.component';

describe('MeteoCoinComponent', () => {
  let component: MeteoCoinComponent;
  let fixture: ComponentFixture<MeteoCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoCoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeteoCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
