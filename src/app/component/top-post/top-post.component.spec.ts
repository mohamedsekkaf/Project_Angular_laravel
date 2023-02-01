import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPostComponent } from './top-post.component';

describe('TopPostComponent', () => {
  let component: TopPostComponent;
  let fixture: ComponentFixture<TopPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
