import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUserCardComponent } from './team-user-card.component';

describe('TeamUserCardComponent', () => {
  let component: TeamUserCardComponent;
  let fixture: ComponentFixture<TeamUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
