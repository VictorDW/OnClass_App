import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBootcampsComponent } from './list-bootcamps.component';

describe('ListBootcampsComponent', () => {
  let component: ListBootcampsComponent;
  let fixture: ComponentFixture<ListBootcampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBootcampsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBootcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
