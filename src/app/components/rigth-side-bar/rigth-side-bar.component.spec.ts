import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigthSideBarComponent } from './rigth-side-bar.component';

describe('RigthSideBarComponent', () => {
  let component: RigthSideBarComponent;
  let fixture: ComponentFixture<RigthSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RigthSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigthSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
