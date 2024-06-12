import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarComponent } from './dashboar.component';

describe('DashboarComponent', () => {
  let component: DashboarComponent;
  let fixture: ComponentFixture<DashboarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
