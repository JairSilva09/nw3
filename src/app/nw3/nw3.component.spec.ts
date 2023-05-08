import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nw3Component } from './nw3.component';

describe('Nw3Component', () => {
  let component: Nw3Component;
  let fixture: ComponentFixture<Nw3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nw3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nw3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
