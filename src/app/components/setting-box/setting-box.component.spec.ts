import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBoxComponent } from './setting-box.component';

describe('SettingBoxComponent', () => {
  let component: SettingBoxComponent;
  let fixture: ComponentFixture<SettingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
