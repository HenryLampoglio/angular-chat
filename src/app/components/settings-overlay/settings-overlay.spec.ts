import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOverlay } from './settings-overlay';

describe('SettingsOverlay', () => {
  let component: SettingsOverlay;
  let fixture: ComponentFixture<SettingsOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
