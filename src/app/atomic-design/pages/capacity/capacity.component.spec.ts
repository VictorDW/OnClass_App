import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCapacityComponent } from './capacity.component';

describe('ContentCapacityComponent', () => {
  let component: ContentCapacityComponent;
  let fixture: ComponentFixture<ContentCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCapacityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
