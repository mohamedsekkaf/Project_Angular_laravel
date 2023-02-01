import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarLeftComponent } from './sidbar-left.component';

describe('SidbarLeftComponent', () => {
  let component: SidbarLeftComponent;
  let fixture: ComponentFixture<SidbarLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidbarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidbarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
