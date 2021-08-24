import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperviewComponent } from './developerview.component';

describe('DeveloperviewComponent', () => {
  let component: DeveloperviewComponent;
  let fixture: ComponentFixture<DeveloperviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
