import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModelsComponent } from './list-models.component';

describe('ListModelsComponent', () => {
  let component: ListModelsComponent;
  let fixture: ComponentFixture<ListModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
