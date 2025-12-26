import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsDialog } from './connections-dialog';

describe('ConnectionsDialog', () => {
  let component: ConnectionsDialog;
  let fixture: ComponentFixture<ConnectionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
