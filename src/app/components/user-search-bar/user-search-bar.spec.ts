import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchBar } from './user-search-bar';

describe('UserSearchBar', () => {
  let component: UserSearchBar;
  let fixture: ComponentFixture<UserSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
