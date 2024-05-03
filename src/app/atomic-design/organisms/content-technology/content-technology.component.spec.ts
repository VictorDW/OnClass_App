import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTechnologyComponent } from './content-technology.component';

describe('ContentTechnologyComponent', () => {
  let component: ContentTechnologyComponent;
  let fixture: ComponentFixture<ContentTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTechnologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
